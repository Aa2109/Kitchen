package com.aashif.kitchen.ServiceImpl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.dto.Message;
import com.aashif.kitchen.service.EmailService;

import jakarta.mail.BodyPart;
import jakarta.mail.Folder;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.NoSuchProviderException;
import jakarta.mail.Part;
import jakarta.mail.Session;
import jakarta.mail.Store;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${mail.store.protocol}")
    String protocol;
    
    @Value("${mail.imaps.host}")
    String host;
    
    @Value("${mail.imaps.port}")
    String port;
    
    @Value("${spring.mail.username}")
    String username;
    
    @Value("${spring.mail.password}")
    String password;

    @Override
    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom("ahsanansari1183@gmail.com");
        
        mailSender.send(simpleMailMessage);
        logger.info("Email has been sent !!");
    }

    @Override
    public void sendEmail(String[] to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom("ahsanansari1183@gmail.com");
        
        mailSender.send(simpleMailMessage);
        logger.info("Email [] has been sent !!");
    }

    @Override
    public void sendEmailWithHtml(String to, String subject, String htmlContent) {
        MimeMessage simpleMailMessage = mailSender.createMimeMessage();
        
        try {
            MimeMessageHelper helper = new MimeMessageHelper(simpleMailMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            helper.setFrom("ahsanansari1183@gmail.com");
            
            mailSender.send(simpleMailMessage);
            logger.info("Email [html] has been sent !!");
        } catch (MessagingException e) {
            logger.error("Error sending HTML email: ", e);
        }
    }

    @Override
    public void sendEmailWithFile(String to, String subject, String message, File file) {
        MimeMessage simpleMailMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(simpleMailMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message, true);
            
            FileSystemResource resource = new FileSystemResource(file);
            helper.addAttachment(resource.getFilename(), file);
            
            helper.setFrom("ahsanansari1183@gmail.com");
            
            mailSender.send(simpleMailMessage);
            logger.info("Email [file] has been sent !!");
        } catch (MessagingException e) {
            logger.error("Error sending email with file: ", e);
        }
    }

    @Override
    public void sendEmailWithFile(String to, String subject, String message, InputStream is) {
        MimeMessage simpleMailMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(simpleMailMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message, true);
            
            File file = new File("src/main/resources/emailFile/default.jpg");
            Files.copy(is, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            FileSystemResource resource = new FileSystemResource(file);
            helper.addAttachment(resource.getFilename(), file);
            
            helper.setFrom("ahsanansari1183@gmail.com");
            
            mailSender.send(simpleMailMessage);
            logger.info("Email [file with stream] has been sent !!");
        } catch (MessagingException | IOException e) {
            logger.error("Error sending email with file stream: ", e);
        }
    }

    @Override
    public List<Message> getInboxMessage() {
        List<Message> list = new ArrayList<>();
        Properties configuration = new Properties();
        
        configuration.setProperty("mail.store.protocol", protocol);
        configuration.setProperty("mail.imaps.host", host);
        configuration.setProperty("mail.imaps.port", port);
        
        Session session = Session.getDefaultInstance(configuration);
        try {
            Store store = session.getStore();
            store.connect(username, password);
            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_ONLY);
            jakarta.mail.Message[] messages = inbox.getMessages();
            
            for (jakarta.mail.Message message : messages) {
                logger.info("Processing message: {}", message.getSubject());
                
                String content = getContentFromEmailMessage(message);
                List<String> files = getFilesFromEmailMessage(message);
                
                list.add(Message.builder().subject(message.getSubject()).content(content).files(files).build());
            }
        } catch (NoSuchProviderException e) {
            logger.error("No such provider exception: ", e);
        } catch (MessagingException e) {
            logger.error("Messaging exception: ", e);
        } catch (IOException e) {
            logger.error("IO exception: ", e);
        }
        return list;
    }

    private List<String> getFilesFromEmailMessage(jakarta.mail.Message message) throws MessagingException, IOException {
        List<String> files = new ArrayList<>();
        if (message.isMimeType("multipart/*")) {
            Multipart content = (Multipart) message.getContent();
            for (int i = 0; i < content.getCount(); i++) {
                BodyPart bodyPart = content.getBodyPart(i);
                if (Part.ATTACHMENT.equalsIgnoreCase(bodyPart.getDisposition())) {
                    InputStream inputStream = bodyPart.getInputStream();
                    File file = new File("src/main/resources/emailFile/" + bodyPart.getFileName());
                    // Save files
                    Files.copy(inputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    files.add(file.getAbsolutePath());
                }
            }
        }
        return files;
    }

    private String getContentFromEmailMessage(jakarta.mail.Message message) throws MessagingException, IOException {
        if (message.isMimeType("text/plain")) {
            return message.getContent().toString();
        } else if (message.isMimeType("text/html")) {
            return message.getContent().toString();
        } else if (message.isMimeType("multipart/*")) {
            Multipart multipart = (Multipart) message.getContent();
            for (int i = 0; i < multipart.getCount(); i++) {
                BodyPart bodyPart = multipart.getBodyPart(i);
                if (bodyPart.isMimeType("text/plain")) {
                    return bodyPart.getContent().toString();
                } else if (bodyPart.isMimeType("text/html")) {
                    return bodyPart.getContent().toString();
                }
            }
        }
        return "Unsupported content type";
    }
}

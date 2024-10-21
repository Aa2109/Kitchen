package com.aashif.kitchen;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.aashif.kitchen.dto.Message;
import com.aashif.kitchen.service.EmailService;

@SpringBootTest
public class EmailSenderTest {
	
	@Autowired
	private EmailService emailService;
	
//	@Test
//	void emailSendTest() {
//		System.out.println("Sending email...");
//		emailService.sendEmail("aashifiqubal68@gmail.com", "Email from Spring Boot", "This is testing email from spring  boot api");
//	}
	
//	@Test
//	void emailSendTestInHtml() {
//		String html = ""+ "<h1 style='color:red; border:1px solid black;'>Hi testing it from html text</h1>" +"";
//		System.out.println("Sending email...");
//		emailService.sendEmailWithHtml("aashifiqubal68@gmail.com", "Email from Spring Boot", html);
//	}
	
//	@Test
//	void emailSendTestWithFile() {
//		System.out.println("Sending email...");
//		emailService.sendEmailWithFile("aashifiqubal68@gmail.com", "Email from Spring Boot","This email conatins file also",
//										new File("D:\\Online-Food-Order\\Backend\\src\\main\\resources\\static\\default.jpg"));
//	}
	
//	@Test
//	void emailSendTestWithFileWithStream() {
//		File file = new File("D:\\Online-Food-Order\\Backend\\src\\main\\resources\\static\\default.jpg");
//		try {
//			InputStream is = new FileInputStream(file);
//			System.out.println("Sending email...");
//			emailService.sendEmailWithFile("aashifiqubal68@gmail.com", "Email from Spring Boot","This email conatins file also",is);
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//	}
	
	//receiving  email test
	@Test
    void getInbox() {
        System.out.println("Fetching inbox messages...");
        List<Message> inboxMessages = emailService.getInboxMessage();
        if (inboxMessages.isEmpty()) {
            System.out.println("No messages found in the inbox.");
        } else {
            inboxMessages.forEach(item -> {
                System.out.println("Subject: " + item.getSubject());
                System.out.println("Content: " + item.getContent());
                System.out.println("Files: " + item.getFiles());
                System.out.println("....................");
            });
        }
    }
}

package com.aashif.kitchen.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.aashif.kitchen.request.EmailRequest;
import com.aashif.kitchen.response.EmailResponse;
import com.aashif.kitchen.service.EmailService;

@RestController
@RequestMapping("/api/email")
public class EmailController {
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/send-without-file")
	public ResponseEntity<EmailResponse> sendEmail(@RequestBody EmailRequest req){
		emailService.sendEmailWithHtml(req.getEmail(), req.getSubject(), req.getContent());
		return ResponseEntity.ok(EmailResponse.builder().message("Email send Successfully!!").httpStatus(HttpStatus.OK).success(true).build());
	}
	
	@PostMapping("/send-with-file")
	public ResponseEntity<EmailResponse> sendEmailWithFile(@RequestPart("req") EmailRequest req, @RequestPart("file") MultipartFile file) throws IOException{
		emailService.sendEmailWithFile(req.getEmail(), req.getSubject(), req.getContent(),file.getInputStream());
		return ResponseEntity.ok(EmailResponse.builder().message("Email send Successfully!!").httpStatus(HttpStatus.OK).success(true).build());
	}

}

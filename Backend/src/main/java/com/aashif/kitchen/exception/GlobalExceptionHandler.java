package com.aashif.kitchen.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.aashif.kitchen.response.ApiResponse;


public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex){
		String message = ex.getMessage();
		ApiResponse res=new ApiResponse(message, false);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.NOT_FOUND);
		
	}
	
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	public ResponseEntity<Map<String, String>> handleMethodArgNotValidException(MethodArgumentNotValidException ex){
//		Map<String, String> res = new HashMap<String, String>();
//		ex.getBindingResult().getAllErrors().forEach((err)->{
//			String fName = ((FieldError)err).getField();
//			String msg = err.getDefaultMessage();
//			res.put(fName, msg);
//		});		
//		return new ResponseEntity<Map<String,String>>(res,HttpStatus.BAD_REQUEST);
//		}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> handleMethodException(Exception ex) {
	    Map<String, String> errors = new HashMap<>();

	    if (ex instanceof MethodArgumentNotValidException) {
	        MethodArgumentNotValidException validationException = (MethodArgumentNotValidException) ex;
	        validationException.getBindingResult().getAllErrors().forEach(error -> {
	            String fieldName = ((FieldError) error).getField();
	            String errorMessage = error.getDefaultMessage();
	            errors.put(fieldName, errorMessage);
	        });
	    }
	    else if(ex instanceof UsernameNotFoundException) {
	    	UsernameNotFoundException usernameNotFoundException = (UsernameNotFoundException) ex;
	        String errorMessage = usernameNotFoundException.getMessage();
	        errors.put("username", errorMessage);
	    }
	    else {
	        // Handle other types of exceptions here if needed
	        errors.put("error", ex.getMessage()); // Default error message for other exceptions
	    }

	    return ResponseEntity.badRequest().body(errors);
	}

}

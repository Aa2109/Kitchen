package com.aashif.kitchen.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.service.GlobalSearchService;
	
	@RestController
	@RequestMapping("/api/search")
	public class GlobalSearchController {
	    @Autowired
	    private GlobalSearchService unifiedSearchService;

	    @GetMapping
	    public ResponseEntity<Map<String, List<?>>> search(@RequestParam String keyword) throws Exception {
	        Map<String, List<?>> results = unifiedSearchService.searchAll(keyword);
	        return ResponseEntity.ok(results);
	    }
}

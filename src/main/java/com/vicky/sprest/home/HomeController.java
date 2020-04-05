package com.vicky.sprest.home;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping("/home")
	public String home(Map<String, Object> model) {
		System.out.println("Home hit");
		model.put("msg", "Hello");
		return "/WEB-INF/jsp/home.jsp";
	}
}

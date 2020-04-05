package com.vicky.sprest.card;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vicky.sprest.stack.Stack;

@Entity
public class Card {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String title;
	private String description;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	private Stack stack;
	
	
	public Card() {
		super();
	}

	public Card(long id, String title, String description) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public Stack getStack() {
		return stack;
	}
	public void setStack(Stack stack) {
		this.stack = stack;
	}
	
}

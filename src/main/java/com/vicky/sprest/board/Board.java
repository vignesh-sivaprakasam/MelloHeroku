package com.vicky.sprest.board;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.vicky.sprest.stack.Stack;

@Entity
public class Board {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String color;
	
	@OneToMany(fetch=FetchType.LAZY, mappedBy="board") // variable name in the Stack class
	private List<Stack> stacks;
	
	public Board() {
		
	}

	public Board(long id, String name, String color) {
		super();
		this.id 	= id;
		this.name 	= name;
		this.color 	= color;
		this.stacks = new LinkedList<Stack>();
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
	
	public List<Stack> getStacks() {
		return stacks;
	}	
	public void setStacks(List<Stack> stacks) {
		this.stacks = stacks;
	}
	
}

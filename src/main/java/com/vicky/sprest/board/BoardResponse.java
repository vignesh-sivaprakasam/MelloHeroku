package com.vicky.sprest.board;

import java.util.ArrayList;
import java.util.List;

import com.vicky.sprest.stack.StackResponse;
import com.vicky.sprest.stack.Stack;

public class BoardResponse {
	private long id;
	private String name;
	private String color;
	
	private List<StackResponse> stacks;
	
	public BoardResponse(Board board) {
		this.id 	= board.getId();
		this.name 	= board.getName();
		this.color 	= board.getColor();
		this.stacks = new ArrayList<StackResponse>();
		board.getStacks().forEach((Stack stack)->{
			this.stacks.add(new StackResponse(stack, new ArrayList<>()));
		});
	}
}

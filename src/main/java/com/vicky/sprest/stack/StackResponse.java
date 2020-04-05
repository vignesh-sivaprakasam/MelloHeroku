package com.vicky.sprest.stack;

import java.util.List;

public class StackResponse extends Stack{
	private List<Long> order;
	
	public StackResponse(Stack stack, List<Long> orders) {
		super(stack.getId(), stack.getName(), stack.getColor());
		this.order = order;
	}

	public List<Long> getOrder() {
		return order;
	}

	public void setOrder(List<Long> order) {
		this.order = order;
	}
	
	
}

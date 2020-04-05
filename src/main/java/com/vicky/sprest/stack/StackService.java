package com.vicky.sprest.stack;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StackService {

	@Autowired
	private StackRepository stackRepo;
	
	public List<StackResponse> getAllStacks(long boardID){
		List<Stack> list = stackRepo.findByBoardId(boardID);
		List<StackResponse> stackResponseList = new ArrayList<StackResponse>();
		list.forEach((Stack stack)->{
			stackResponseList.add(new StackResponse(stack, new ArrayList<>()));
		});
		return stackResponseList; // variable name in Stack class
	}
	
	public Stack createStack(Stack stack) {
		return stackRepo.save(stack);
	}
	
	public Stack getStack(long stackID) {
		return stackRepo.findById(stackID).get();
	}
	
	public void deleteStack(long stackID) {
		stackRepo.deleteById(stackID);
	}

	public Stack updateStack(Stack stack) {
		return stackRepo.save(stack);
	}
}

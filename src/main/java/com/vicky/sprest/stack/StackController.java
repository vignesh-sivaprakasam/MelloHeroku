package com.vicky.sprest.stack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vicky.sprest.board.Board;
import com.vicky.sprest.card.CardOrder;

@RestController
@RequestMapping("/boards/{boardID}")
public class StackController {
	
	@Autowired
	private StackService stackService;

	@GetMapping("/stacks")
	public List<StackResponse> getAllStacks(@PathVariable("boardID") long boardID){
		System.out.println(" getStacks ");
		return stackService.getAllStacks(boardID);
	}
	
	@PostMapping("/stacks")
	public Stack createStack(@PathVariable("boardID") long boardID, @RequestBody Stack stack) {
		Board board = new Board();
		board.setId(boardID);
		stack.setBoard(board);
		stack.setCardOrder(new CardOrder(stack, "[]"));
		return stackService.createStack(stack);
	}
	
	
	@GetMapping("/stacks/{stackID}")
	public Stack getStack(@PathVariable("stackID") long stackID) {
		return stackService.getStack(stackID);
	}
	
	@DeleteMapping("/stacks/{stackID}")
	public void deleteStack(@PathVariable("stackID") long stackID) {
		stackService.deleteStack(stackID);
	}
	
	@PutMapping("/stacks/{stackID}")
	public Stack updateStack(@PathVariable("boardID") long boardID, @PathVariable("stackID") long stackID, @RequestBody Stack stack) {
		System.out.println(" stack : "+ stackID+"boardID : "+boardID);
		stack.setBoard(new Board(boardID, "", ""));
		stack.setId(stackID);
		return stackService.updateStack(stack);
	}
	
}

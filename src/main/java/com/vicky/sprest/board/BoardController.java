package com.vicky.sprest.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@RequestMapping("/boards")
	public List<Board> getAllBoards() {
		return boardService.getAllBoards();
	}
	
	@RequestMapping("/boards/{id}")
	public Board getBoard(@PathVariable("id") long id) {
		return boardService.getBoard(id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/boards/{id}")
	public void deleteBoard(@PathVariable("id") long id) {
		boardService.deleteBoard(id);
	}
	
	
	@RequestMapping(method=RequestMethod.POST, value="/boards")
	public Board createBoard(@RequestBody Board board) {
		return boardService.createBoard(board);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/boards/{id}")
	public Board updateBoard(@RequestBody Board board, @PathVariable("id") long id) {
		return boardService.updateBoard(id, board);
	}
	
	@RequestMapping(method=RequestMethod.PATCH, value="/boards/{id}/name")
	public void updateBoard1(@RequestBody Board board, @PathVariable("id") long id) {
		boardService.updateName(id, board);
	}
}

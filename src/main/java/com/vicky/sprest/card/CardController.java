package com.vicky.sprest.card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vicky.sprest.stack.Stack;


@RestController
@RequestMapping("/boards/{boardID}/stacks/{stackID}")
public class CardController {
	
	@Autowired
	private CardService cardService;
	
	@GetMapping("/cards")
	public List<Card> getAllCards(@PathVariable("stackID")long stackID){
		System.out.println("StackID :"+stackID);
		return cardService.getAllCards(stackID);
	}
	
	@PostMapping("/cards")
	public Card createCard(@PathVariable("stackID")long stackID, @RequestBody Card card) {
		card.setStack(new Stack(stackID, "", ""));
		return cardService.createCard(card);
	}
	
	@GetMapping(value="/cards/{cardID}")
	public Card getCard(@PathVariable("stackID")long stackID, @PathVariable("cardID")long cardID) {
		return cardService.getCard(cardID);
	}
	
	@DeleteMapping("/cards/{cardID}")
	public void deleteCard(@PathVariable("stackID")long stackID, @PathVariable("cardID")long cardID) {
		cardService.deleteCard(stackID, cardID);
	}
	
	@PutMapping("/cards/{cardID}")
	public Card updateStack(@PathVariable("stackID")long stackID, @PathVariable("cardID")long cardID, @RequestBody Card card) {
		card.setStack(new Stack(stackID, "", ""));
		card.setId(cardID);
		return cardService.updateCard(card);
	}
	
	@PutMapping("/cards/{cardID}/move")
	public void moveStack(@PathVariable("stackID")long stackID, @PathVariable("cardID")long cardID, @RequestParam(value="stackID")long toStackID, @RequestParam("pos") int position) {
		System.out.println(" stackID : "+stackID+ " cardID :"+cardID+ " toStackID : "+toStackID+ " pos :"+position);
		cardService.moveCard(stackID, toStackID, cardID, position);
	}
	
}

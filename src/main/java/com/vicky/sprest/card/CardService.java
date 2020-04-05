package com.vicky.sprest.card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vicky.sprest.stack.Stack;

@Service
public class CardService {
	
	@Autowired
	private CardRepository cardRepo;
	
	@Autowired
	private CardOrderRepository cardOrderRepo;
	
	public List<Card> getAllCards(long stackID){
		return cardRepo.findByStackId(stackID);
	}
	
	public Card createCard(Card card) {
		Card cardRes = cardRepo.save(card);
		CardOrder cardOrder = cardOrderRepo.findById(card.getStack().getId()).get();
		cardOrder.addCard(cardRes.getId());
		cardOrderRepo.save(cardOrder);
		return cardRes;
	}

	public Card getCard(long cardID) {
		return cardRepo.findById(cardID).get();
	}

	public void deleteCard(long stackID, long cardID) {
		CardOrder cardOrder = cardOrderRepo.findByStackId(stackID);
		cardOrder.deleteCard(cardID);
		
		cardOrderRepo.save(cardOrder);
		cardRepo.deleteById(cardID);
	}
	
	public Card updateCard(Card card) {
		return cardRepo.save(card);
	}
	
	public void moveCard(long fromStackID, long toStackID, long cardID, int pos) {
		CardOrder fromCardOrder = cardOrderRepo.findByStackId(fromStackID);
		CardOrder toCardOrder   = cardOrderRepo.findByStackId(toStackID);
		
		int indexToBeDeleted = fromCardOrder.getIndex(cardID);
		
		fromCardOrder.removeCard(indexToBeDeleted, cardID);
		toCardOrder.insertCard(pos, cardID);
		
		if(fromStackID != toStackID) {
			Card card = cardRepo.findById(cardID).get();
			card.setStack(new Stack(toStackID, "", ""));
			cardRepo.save(card);
		}
		cardOrderRepo.save(fromCardOrder);
		cardOrderRepo.save(toCardOrder);
		
	}
}

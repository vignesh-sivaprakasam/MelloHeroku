package com.vicky.sprest.card;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.json.JSONArray;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysql.cj.xdevapi.JsonArray;
import com.vicky.sprest.stack.Stack;

@Entity
public class CardOrder {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@JsonIgnore
	@OneToOne
	private Stack stack;
	private String cardOrder;
	
	public CardOrder() {
		super();
	}
	
	public CardOrder(Stack stack, String cardOrder) {
		super();
		this.stack = stack;
		this.cardOrder = cardOrder;
	}
	
	public Stack getStack() {
		return stack;
	}
	public void setStack(Stack stack) {
		this.stack = stack;
	}
	public String getCardOrder() {
		return cardOrder;
	}
	public void setCardOrder(String cardOrder) {
		this.cardOrder = cardOrder;
	}
	
	public void addCard(long cardID) {
		JSONArray jsonArr = new JSONArray(this.cardOrder);
		jsonArr.put(cardID);
		this.cardOrder = jsonArr.toString();
	}
	
	public void deleteCard(long cardID) {
		JSONArray jsonArr = new JSONArray(this.cardOrder);
		
		List<Object> list = jsonArr.toList();
		list.remove(cardID);
		
		this.cardOrder = list.toString();
	}
	
	public void insertCard(int position, long cardID) {
		JSONArray jsonArr = new JSONArray(this.cardOrder);
		List<Object> list = jsonArr.toList();
		list.add(position, cardID);
		
		this.cardOrder = list.toString();
	}
	
	public void removeCard(int index, Long cardID) {
		JSONArray jsonArr = new JSONArray(this.cardOrder);
		jsonArr.remove(index);
		
		this.cardOrder = jsonArr.toString();
	}
	
	public int getIndex(long cardID) {
		JSONArray jsonArr = new JSONArray(this.cardOrder);
		
		for(int i = 0 ; i < jsonArr.length(); i++) {
			if(jsonArr.getLong(i) == cardID) {
				return i;
			}
		}
		return -1;
	}
	
	
	public static void main(String[] args) {
		JSONArray arr = new JSONArray("[1, 2, 3]");
		System.out.println("2 :: "+arr.get(2));
		List<Object> lis = arr.toList();
		
		lis.remove(2);
		System.out.println(" :: "+lis.toString());
		System.out.println(" :: "+arr.toString());
		
	
		
	}
	
}

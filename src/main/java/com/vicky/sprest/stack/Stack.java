package com.vicky.sprest.stack;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vicky.sprest.board.Board;
import com.vicky.sprest.card.Card;
import com.vicky.sprest.card.CardOrder;

@Entity
public class Stack {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String color;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	private Board board;
	
	@OneToOne(fetch=FetchType.LAZY, mappedBy="stack", cascade=CascadeType.ALL)
	private CardOrder cardOrder;
	
	
	@OneToMany(fetch=FetchType.LAZY, mappedBy="stack")
	private List<Card> cards;
	

	public Stack() {
		super();
	}

	public Stack(long id, String name, String color) {
		super();
		this.id 	= id;
		this.name 	= name;
		this.color 	= color;
		this.cards 	= new ArrayList<Card>();
	}
	

	public CardOrder getCardOrder() {
		return cardOrder;
	}

	public void setCardOrder(CardOrder cardOrder) {
		this.cardOrder = cardOrder;
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
	
	public Board getBoard() {
		return board;
	}
	public void setBoard(Board board) {
		this.board = board;
	}
	
	
	public List<Card> getCards() {
		return cards;
	}
	public void setCards(List<Card> cards) {
		this.cards = cards;
	}
	
	
}

package com.vicky.sprest.card;

import org.springframework.data.repository.CrudRepository;

public interface CardOrderRepository extends CrudRepository<CardOrder, Long>{
	public CardOrder findByStackId(long stackID);
}

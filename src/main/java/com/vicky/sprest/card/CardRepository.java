package com.vicky.sprest.card;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


public interface CardRepository extends CrudRepository<Card, Long>{
	public List<Card> findByStackId(long stackID);
}

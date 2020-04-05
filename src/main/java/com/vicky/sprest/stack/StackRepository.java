package com.vicky.sprest.stack;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface StackRepository extends CrudRepository<Stack, Long>{
	public List<Stack> findByBoardId(long boardID);
}

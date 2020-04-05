package com.vicky.sprest.board;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends CrudRepository<Board, Long> {
	
	@Query("UPDATE Board SET name= :NAME")
	@Modifying
	@Transactional
	public void updateName(@Param("NAME")String name);
}

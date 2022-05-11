package com.djjstory.djstory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.djjstory.djstory.model.TodoEntity;
import com.djjstory.djstory.persistence.TodoRepository;

@Service
public class TodoService {
	
	@Autowired
	TodoRepository todoRepository;
	
	public String testService() {
		TodoEntity todoEntity = TodoEntity.builder().title("My first todo item").build();
		todoRepository.save(todoEntity);
		TodoEntity savedEntity = todoRepository.findById(todoEntity.getId()).get();
		return savedEntity.getId() + " : " + savedEntity.getTitle();
	}
	

}

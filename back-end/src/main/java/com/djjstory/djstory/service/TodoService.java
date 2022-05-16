package com.djjstory.djstory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.djjstory.djstory.model.TodoEntity;
import com.djjstory.djstory.persistence.TodoRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	
	public void validate(final TodoEntity entity) {
		if(entity == null) {
			log.warn("Entity cannot be null.");
			throw new RuntimeException("Entity cannot be null.");
		}
		if(entity.getUserId() == null) {
			log.warn("Unknown user.");
			throw new RuntimeException("Unknown user.");
		}
	}
	
	public List<TodoEntity> create(final TodoEntity entity){
		//Validations
		validate(entity);		
		todoRepository.save(entity);
		log.info("Entity id : {} is saved.", entity.getId());
		return todoRepository.findByUserId(entity.getUserId());
	}
	
	public List<TodoEntity> retrieve(final String userId){
		return todoRepository.findByUserId(userId);
	}
	
	public List<TodoEntity> update(final TodoEntity entity){
		validate(entity);		
		Optional<TodoEntity> original = todoRepository.findById(entity.getId());

		original.ifPresent(todo -> {
			todo.setTitle(entity.getTitle());
			todo.setDone(entity.isDone());
			
			todoRepository.save(todo);
		});
		
		return retrieve(entity.getUserId());
	}
	
	public void delete(final TodoEntity entity) {
		validate(entity);
		todoRepository.delete(entity);
		return;
		
	}
	
	
}

package com.djjstory.djstory.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

import com.djjstory.djstory.security.JwtAuthenticationFilter;


@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		
		http.cors()
			.and()
			.csrf().disable()	//csrf는 현재 사용하지 않으므로 disable
			.httpBasic().disable()	//token을 사용하므로 basic 인증 disable
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //session기반이 아님을 선언 
			.and()
			.authorizeRequests().antMatchers("/","/auth/**").permitAll()
			.anyRequest().authenticated();	//	'/' 와  '/auth/**' 이외의 모든 경로는 인증 해야 함.
		
		//filter 등록
		//매 요청마다 CorsFilter 실행한 후에 jwtAuthenticationFilter 실행.
		//반드시 CorsFilter 실행한 후에 실행해야 하는 규칙은 없으나 적당할 것으로 판단하여 설정.
		http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);
	}
}

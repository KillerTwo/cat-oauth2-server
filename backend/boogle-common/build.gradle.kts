/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    id("org.wm.java-conventions")
}

dependencies {
    api(project(":boogle-core"))
    api("org.springframework.boot:spring-boot-starter-aop")
    api("org.springframework.boot:spring-boot-starter-data-redis")
    api("commons-fileupload:commons-fileupload:1.4")
    api("com.alibaba:druid-spring-boot-starter:1.2.8")
    implementation("mysql:mysql-connector-java:8.0.28")
    implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:2.2.2")
    api("eu.bitwalker:UserAgentUtils:1.21")
    api("cn.hutool:hutool-all:5.8.0")
    api("com.github.penggle:kaptcha:2.3.2")
    api("org.springframework.security:spring-security-oauth2-authorization-server:0.3.1")
}

description = "通用工具模块"

/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    `java-library`
    `maven-publish`
    id("org.springframework.boot")
}

apply(plugin = "io.spring.dependency-management")

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    mainClass.set("org.wm.WebAppApplication")
}

repositories {
    mavenLocal()
    maven {
        url = uri("https://maven.aliyun.com/repository/public/")
    }
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    api("org.springframework.boot:spring-boot-starter-web")
    api("org.springframework.boot:spring-boot-configuration-processor")
    api("org.projectlombok:lombok:1.18.24")
    annotationProcessor("org.projectlombok:lombok:1.18.24")
    testAnnotationProcessor("org.projectlombok:lombok:1.18.24")
    implementation("io.netty:netty-all:4.1.76.Final")
    api("com.github.pagehelper:pagehelper-spring-boot-starter:1.4.1")
    api("com.alibaba.fastjson2:fastjson2:2.0.4")
    api("com.alibaba.fastjson2:fastjson2-extension:2.0.4")
    implementation("javax.validation:validation-api:2.0.1.Final")
    implementation("org.hibernate.validator:hibernate-validator:6.1.7.Final")
    implementation("javax.xml.bind:jaxb-api:2.3.1")
    implementation("org.glassfish.jaxb:jaxb-runtime:2.3.1")
    implementation("com.sun.xml.ws:rt:2.3.3")
    implementation("org.springdoc:springdoc-openapi-ui:1.6.8")
    implementation("org.springdoc:springdoc-openapi-javadoc:1.6.8")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test:3.4.17")
}

group = "org.wm"
version = "2022.05.22-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}

tasks.withType<JavaCompile>() {
    options.encoding = "UTF-8"
}

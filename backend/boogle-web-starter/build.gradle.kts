/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    id("org.wm.java-conventions")
}

dependencies {
    implementation(project(":boogle-system"))
    implementation(project(":boogle-quartz"))
    implementation(project(":boogle-generator"))
    implementation(project(":boogle-oauth2-server"))
}

description = "代码启动入口模块"

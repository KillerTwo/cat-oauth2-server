/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    id("org.wm.java-conventions")
}

dependencies {
    implementation(project(":boogle-common"))
    implementation(project(":boogle-logging"))
    implementation("org.apache.velocity:velocity-engine-core:2.3")
}

description = "代码生成模块"

package com.example.demo.controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api")
class   ExemploController {
    @GetMapping("test")
    fun get(@RequestParam("name") name: String?):String {
        return "Hello $name".replaceFirstChar(Char::uppercaseChar)
    }
    @GetMapping("2")
    fun get2()="Hello World!"
}
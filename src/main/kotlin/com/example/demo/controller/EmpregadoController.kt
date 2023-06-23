package com.example.demo.controller

import com.example.demo.entity.Empregado
import com.example.demo.service.EmpregadoService
import org.springframework.http.MediaType
import org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("empregado")
class EmpregadoController (val service:EmpregadoService){
    @GetMapping(
        produces = [APPLICATION_JSON_VALUE]
    )
    fun getAll():List<Empregado> = service.getAll()
    @PostMapping(
        consumes = [APPLICATION_JSON_VALUE]
    )
    fun post(@RequestBody empregado: Empregado) = service.save(empregado)
    @PutMapping(consumes = [APPLICATION_JSON_VALUE])
    fun put(@RequestBody empregado: Empregado) = service.update(empregado)
    @GetMapping(
        path = ["{id}"]
    )
    fun getById(@PathVariable("id") id: Long) = service.getById(id).getOrNull(0)
    @DeleteMapping("{id}")
    fun delete(@PathVariable("id") id: Long) = service.delete(id)
}
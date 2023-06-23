package com.example.demo.entity

import java.time.LocalDateTime
import java.sql.Date;
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.stream.Collectors

class Empregado(id: Long?, nome: String?, sobrenome: String?, dtNacimento: LocalDateTime?, dthCriacao: LocalDateTime?) {
    constructor(id: Long, nome: String?, sobrenome: String?, dtNacimento: Date?,dthCriacao: String) : this(id,nome,sobrenome,
        Optional.ofNullable(dtNacimento)
            .map(Date::toLocalDate)
            .map(LocalDate::atStartOfDay)
            .orElse(null),
        null
    ){
        val opDthCriacao = Optional
            .ofNullable(dthCriacao)
            .filter{ s-> !s.isEmpty()}
            .map { s-> s.split(" ").stream().collect(Collectors.joining("T")) }
        if(opDthCriacao.isPresent)
            this.dthCriacao = LocalDateTime.parse(opDthCriacao.get(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
    }

    var id:Long? = id
    var nome:String? = nome
    var sobrenome:String? = sobrenome
    var dtNacimento:LocalDateTime? = dtNacimento
    var dthCriacao: LocalDateTime? = dthCriacao

}

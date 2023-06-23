package com.example.demo.service

import com.example.demo.entity.Empregado
import org.springframework.stereotype.Service
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet
import java.time.LocalDateTime
import java.util.Optional

@Service
class EmpregadoService (val db: JdbcTemplate){
    fun getAll():List<Empregado> = db.query("SELECT * from EMPREGADO"){
            response,_-> resolveResponse(response)
    }
    fun save(empregado: Empregado) = db.update("INSERT INTO EMPREGADO (nome,sobrenome,dtNacimento,dthCriacao) VALUES (?,?,?,?)",empregado.nome,empregado.sobrenome,empregado.dtNacimento,LocalDateTime.now())
    fun delete(id: Long) = db.update("delete from EMPREGADO where id = ?", id)
    fun getById(id: Long) = db.query("SELECT * from EMPREGADO where id = ?", RowMapper { rs, rowNum -> resolveResponse(rs)  },id)
    private fun resolveResponse(response: ResultSet) = Empregado(response.getLong("id"),
        response.getString("nome"),
        response.getString("sobrenome"),
        response.getDate("dtNacimento"),
        Optional.ofNullable(response.getString("dthCriacao")).orElse(""))

    fun update(empregado: Empregado) = db.update("UPDATE EMPREGADO SET nome=?,sobrenome=?,dtNacimento=? WHERE id=?",empregado.nome,empregado.sobrenome,empregado.dtNacimento,empregado.id)

}

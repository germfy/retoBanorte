var express = require('express');
var router = express.Router();
var ibmdb = require('ibm_db');
var serviceName = 'SQL Database-ls';
var dsnString = "DRIVER={DB2};DATABASE=SQLDB;UID=user08165;PWD=8M5qCKXYBSRf;HOSTNAME=75.126.155.153;port=50000";

var sqlStatement;

router.get('/consultaCliente', funcion(req, res){
  ibmdb.open(dsnString, function(err, connection){
    if(err){
      res.send(err);
    }
    if(req.query.Cliente_ID){
      sqlStatement = "Select nombre, apellidos from cat_clientes where Cliente_ID = " + req.query.Cliente_ID;
    }else {
      sqlStatement = "select * from Cat_clientes";
    }
    connection.query(sqlStatement, function (err, rows, moreResultSets) {
      if(err){
        res.send(err);
      } else {
        connection.close(function(err){
          if(err){
            res.send(err);
          }
        });

        console.log(rows);
        res.send(rows);
      };
    });
  });
});

router.get('/consultaProducto', funcion(req, res){
  ibmdb.open(dsnString, function(err, connection){
    if(err){
      res.send(err);
    }
    if(req.query.Producto_ID){
      sqlStatement = "Select nombreproducto, descripcion, tipoProducto from cat_productos where Producto_ID = " + req.query.Producto_ID;
    }else {
      sqlStatement = "select * from cat_productos";
    }
    connection.query(sqlStatement, function (err, rows, moreResultSets) {
      if(err){
        res.send(err);
      } else {
        connection.close(function(err){
          if(err){
            res.send(err);
          }
        });

        console.log(rows);
        res.send(rows);
      };
    });
  });
});

router.get('/consultaProductosCliente', funcion(req, res){
  ibmdb.open(dsnString, function(err, connection){
    if(err){
      res.send(err);
    }
    sqlStatement = "Select Cat_cuentas.Producto_ID, NoCuenta, Status from Cat_cuentas where Cliente_ID = " + req.query.Cliente_ID;

    connection.query(sqlStatement, function (err, rows, moreResultSets) {
      if(err){
        res.send(err);
      } else {
        connection.close(function(err){
          if(err){
            res.send(err);
          }
        });

        console.log(rows);
        res.send(rows);
      };
    });
  });
});

router.get('/consultaSaldo', funcion(req, res){
  ibmdb.open(dsnString, function(err, connection){
    if(err){
      res.send(err);
    }

    sqlStatement = "Select saldo from cat_cuentas where Cliente_ID = " + req.query.Cliente_ID + " and NoCuenta = " + req.query.NoCuenta;

    connection.query(sqlStatement, function (err, rows, moreResultSets) {
      if(err){
        res.send(err);
      } else {
        connection.close(function(err){
          if(err){
            res.send(err);
          }
        });

        console.log(rows);
        res.send(rows);
      };
    });
  });
});

router.get('/calificacionBuroCredito', function(req, res){
  res.send(Math.random()*(6-1) + 1);
})
module.exports = router;

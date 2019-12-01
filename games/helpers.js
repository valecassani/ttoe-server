export const saveGame = game => {
    connection.query("INSERT INTO games \(CustomerName, ContactName, Address, City, PostalCode, Country\) VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}
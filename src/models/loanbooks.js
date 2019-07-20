require('dotenv').config()
const connection = require('../configs/db');
module.exports = {
    getLoanbooks: (search) => {
        console.log(search)
        return new Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT `loan_book`.*, `user`.`name`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book WHERE loan_book.card_number LIKE ? OR user.name LIKE ? ORDER BY id_loanbook DESC", [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connection.query("SELECT `loan_book`.*, `user`.`name`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book ORDER BY id_loanbook DESC", (err, result) => {
                    if (!err) {

                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    loanbooksDetail: (id_loanbook) => {
        return new Promise((resolve, reject) => {
            console.log(id_loanbook)
            connection.query('SELECT loan_book.*, user.name FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number WHERE id_loanbook= ?', id_loanbook, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateLoanbooks: (id_loanbook, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE loan_book SET ? WHERE id_loanbook=?', [data, id_loanbook], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertLoanbooks: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO loan_book SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteLoanbooks: (id_loanbooks) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM loan_book WHERE id_loanbook = ?', id_loanbooks, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
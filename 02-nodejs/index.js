/**
 * 0. Obter usuário
 * 1. Obter o número de telefone de um usuário a partir de seu id
 * 2. Obter endereço do usuário pelo id 
	*/

const util = require('util');

const getAddressAsync = util.promisify(getAddress);

function getUser() {
	// quando der algum problema, chama-se o reject
	// se for sucesso, chama-se o resolve
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve({
				id: 1,
				name: 'Caio',
				birthday: new Date()
			})
		}, 1000);
	});
}

function getTelephone(userId) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve({
				telephone: '978632451',
				ddd: 11,
			});
		}, 2000);
	});
}

function getAddress(userId, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'dos cravos',
			numero: 0,
		})
	}, 3000);
}

const userPromisse = getUser();
// .then() é usada para a maniupualçao caso a req seja bem sucedida
// .catch() é usada para pegar o erro
// user => telefone => 
userPromisse
	.then(user => {
		return getTelephone(user.id)
			.then(res => {
				return {
					usuario: user,
					telefone: res,
				};
			})
	})
	.then(res => {
		const address = getAddressAsync(res.usuario.id);
		return address.then(resAddress => {
			return {
				...res,
				endereco: resAddress
			}
		})
	})
	.then(res => console.log(`
	Nome: ${res.usuario.name}
	Endereço: ${res.endereco.rua}, n° ${res.endereco.numero}
	Telefone: (${res.telefone.ddd}) ${res.telefone.telephone}`))
	.catch(err => console.log('error:', err));

// getUser(function userResolve(error, user) {
// 	if (error) {
// 		console.error('Não foi possível resolver o usuário.', error);
// 		return;
// 	}
// 	getTelephone(user.id, function telephoneResolve(error, telephone) {
// 		if (error) {
// 			console.error('Não foi possível resolver o telefone.', error);
// 			return;
// 		}
// 		getAddress(user.id, function (error, address) {
// 			if (error) {
// 				console.error('Não foi possível resolver o endereço.', error);
// 				return;
// 			}
// 			console.log(`Nome: ${user.name}\nTelephone: (${telephone.ddd}) ${telephone.telephone}\nAddress: ${address.rua}, n° ${address.numero}`);
// 		});
// 	});
// });



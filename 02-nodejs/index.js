/**
 * 0. Obter usuário
 * 1. Obter o número de telefone de um usuário a partir de seu id
 * 2. Obter endereço do usuário pelo id 
	*/

function getUser(callback) {
	setTimeout(() => {
		return callback(null, {
			id: 1,
			name: 'Caio',
			birthday: new Date()
		})
	}, 1000);

}

function getTelephone(userId, callback) {
	setTimeout(() => {
		return callback(null, {
			telephone: '978632451',
			ddd: 11,
		});
	}, 2000);
}

function getAddress(userId, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'dos cravos',
			numero: 0,
		})
	}, 3000);
}

function userResolve(error, user) {
	console.log('user', user);

}

getUser(function userResolve(error, user) {
	if (error) {
		console.error('Não foi possível resolver o usuário.', error);
		return;
	}
	getTelephone(user.id, function telephoneResolve(error, telephone) {
		if (error) {
			console.error('Não foi possível resolver o telefone.', error);
			return;
		}
		getAddress(user.id, function (error, address) {
			if (error) {
				console.error('Não foi possível resolver o endereço.', error);
				return;
			}
			console.log(`Nome: ${user.name}\nTelephone: (${telephone.ddd}) ${telephone.telephone}\nAddress: ${address.rua}, n° ${address.numero}`);
		});
	});
});
// const telephone = getTelephone(user.id);
// const address = getAddress(user.id);

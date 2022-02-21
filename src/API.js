
export async function getWords(numberGroup, numberPage) {
    this.setState({loading: true});
    const response = await fetch(`https://learnwords-reslang.herokuapp.com/words?page=${this.state.currentPage}&group=${numberGroup}`)
    const commit = await response.json();
    this.setState({loading: false, character: commit})
}

export const createUser = async user => {
  try {
    const rawResponse = await fetch('https://learnwords-reslang.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();
    console.log(content);
  } catch (err) {
    console.log('Некорректный логин или пароль')
  }
  
  };

export const loginUser = async user => {
  try {
    const rawResponse = await fetch('https://learnwords-reslang.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();

    return content;
  } catch (err) {
    console.log('Аккаунт не найден. Проверьте логин и пароль или выполните регистрацию')
  }
    
  };

export const getUserId = async ({ userId, token }) => {
  try {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();

    return content;
  } catch (e) {
    console.log('Пользователь не найден.')
  }

};

  export const createUserWord = async ({ userId, wordId, token, word }) => {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };
  
export const getUserWord = async ({ userId, wordId, token }) => {
  const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  console.log(content);
};

export const getStatistics = async (userId, token) => {
  const rawResponse = await fetch(
    `https://learnwords-reslang.herokuapp.com/users/${userId}/statistics`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const content = await rawResponse.json();
  return content;
};

export const putStatistics = async (userId, token, body) => {
  await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/statistics`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};


export const getUserWords = async ({ userId, token }) => {
  const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  const content = await rawResponse.json();
  return content
};

export const getWordId = async (wordId) => {
  try {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/words/${wordId}`);
    const content = await rawResponse.json();
    return content;
  } catch (e) {
    console.log('Слово не найдено.')
  }

};

export const removeUserWord = async ({ userId, wordId, token }) => {
  const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return rawResponse.json();
};

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import rootReducer from './store/reducers/rootReducer.js';
import thunk from 'redux-thunk';

// Чтобы работало расширение devtools
const composeEnhancers =
	typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

// Создание store (хранение всех данных фронтенда)
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk)
	)
);

// Параметры всплывающих уведомлений
const alertOptions = {
	position: positions.TOP_CENTER,
	timeout: 5000,
	offset: '30px',
	transition: transitions.SCALE
}

ReactDOM.render(
	<Provider store={store}>		{/* Для работы store */}
		<AlertProvider template={AlertTemplate} {...alertOptions}>		{/* Для работы всплывающих уведомлений */}
			<HashRouter>		{/* Для работы роутера (HashRouter для хранения истории, а также исключения обработки роутов роутером с бэкенда) */}
				<App />		{/* Корневой компонент приложения */}
			</HashRouter>
		</AlertProvider>
	</Provider>,
	document.getElementById('root')
);

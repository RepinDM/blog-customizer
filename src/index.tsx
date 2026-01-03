import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type ArticleFormController = {
	value: ArticleStateType;
	setValue: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	apply: () => void;
	reset: () => void;
};

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Черновик формы (меняется сразу)
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// Применённые настройки (влияют на статью)
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = () => {
		setArticleSettings(formSettings);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setArticleSettings(defaultArticleState);
	};

	// ✅ Один объект, который содержит всё управление формой
	const form = useMemo<ArticleFormController>(
		() => ({
			value: formSettings,
			setValue: setFormSettings,
			apply: handleApply,
			reset: handleReset,
		}),
		[formSettings]
	);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={() => setIsOpen((v) => !v)}
				onClose={() => setIsOpen(false)}
				form={form}
			/>

			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

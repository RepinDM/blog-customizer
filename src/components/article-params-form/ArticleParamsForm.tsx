import { useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import type { ArticleFormController } from 'src/index';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	form: ArticleFormController;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	form,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: () => onClose(),
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		form.apply();
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		form.reset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={form.value.fontFamilyOption}
						onChange={(option) =>
							form.setValue((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={form.value.fontSizeOption}
						onChange={(option) =>
							form.setValue((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={form.value.fontColor}
						onChange={(option) =>
							form.setValue((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={form.value.backgroundColor}
						onChange={(option) =>
							form.setValue((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={form.value.contentWidth}
						onChange={(option) =>
							form.setValue((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

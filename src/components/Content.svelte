<script lang="ts">
	import Game from './Game.svelte';
	import Accordion from './Accordion.svelte';
	import { getContext } from 'svelte';

	const data = getContext('data');
	let count = 0;

	$: count = $data.flat().length * 2;
</script>

<div class="wrapper">
	<div class="info">
		Բարև «Կարգինի» սիրահար, <a href="https://www.linkedin.com/in/mam1konyan/" target="_blank"
			>ես Պարույրն եմ</a
		>
		😊 Եթե էս էջում ես հիմա՝ ուրեմն կա՛մ սիրում ես «Կարգին Հաղորդում», կա՛մ IT ոլորտից ես ու մտել ես
		պռոյեկտը ուսումնասիրես, դե կա՛մ էլ՝ էրկուսը միասին 😆 Շատ կարճ պատմեմ էս պռոյեկտի մասին 👇🏻
		<br />
		<br />
		<Accordion>
			<span slot="head">Ինչի՞ մասին ա էս պռոյեկտը</span>
			<div slot="details">
				Էս պռոյեկտը իմ մասնագիտական ու պատանեկան հետաքրքրությունների արդյունքն ա։ Եթե չգիտես՝
				2015-ից զբաղվում եմ Frontend ծրագրավորմամբ, դե իսկ «Կարգին Հաղորդումները» մանկուց էնքան եմ
				նայել ու վերանայել որ գրեթե անգիր գիտեմ։ Իմ հիմնական ֆռոնտէնդական tool-ը քանի տարի ա
				<a href="https://react.dev/" target="_blank">React</a>-ն ա, ես իրան անչափ հարգում ու տեղ եմ
				տալիս, բայց դե էս ինչքան ժամանակ ա նորություն եմ ուզում, ու որոշեցի սովորեմ
				<a href="https://svelte.dev/" target="_blank">Svelte</a>: Իմ համար սովորելու լավագույն ձևը
				պրակտիկան ա ու ես էլ որոշեցի համատեղեմ օգտակարը հաճելիի հետ՝ համ նոր տեխնոլոգիա սովորեցի,
				համ էլ ստեղծեցի սենց մինի-խաղ իմ նման «Կարգինի» ֆանատների համար 🍿
			</div>
		</Accordion>
		<Accordion>
			<span slot="head">Ե՞րբ կարելի ա օգտվել</span>
			<div slot="details">
				Եթե մի քանի հոգով վիճում եք թե ով ա «Կարգինից» ավելի լավ՝ հերթով անցեք խաղը, ու ամենաշատ
				միավորներ հավաքած մարդուն հանգիստ կարաք հռչակեք «Կարգինի» լոկալ չեմպիոն 🏆
			</div>
		</Accordion>
		<Accordion>
			<span slot="head">Ի՞նչ ա պետք խաղալու համար</span>
			<div slot="details">
				Եթե կարճ՝ մենակ ինտերնետ ու բրաուզեռ։ Չկա գրանցում (դեռ, եթե շատերին հետաքրքրեց` կարող ա
				ռեյտինգային համակարգ մտցնեմ հետագայում), չկա որևէ վճարովի բան։ Ամեն ինչ հասանելի ա ու
				անվճար, մենակ պետք ա բացել ու խաղալ 😇
			</div>
		</Accordion>
		<br />
		Էս պահին խաղում կա <strong>{count}</strong> կերպար «Կարգինից» ու էդ թիվը պարբերաբար աճում ա 🚀
	</div>

	<Game />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		padding: 1rem 10vmin;
		gap: 10vmin;
		flex-grow: 1;
		flex-shrink: 0;
		align-items: center;
	}

	.info {
		line-height: 2.5em;
		letter-spacing: 3px;
		max-width: 30rem;
		font-size: 0.8rem;
	}

	a,
	strong {
		text-decoration: none;
		color: var(--primary-color);
	}

	@media screen and (min-width: 1025px) {
		.wrapper {
			flex-direction: row;
			justify-content: space-around;
			align-items: flex-start;
		}

		.info {
			font-size: 1rem;
		}
	}
</style>

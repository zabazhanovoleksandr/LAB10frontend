function setImg(x, y, id)
{
	$(`#img${x}${y}`).attr("src", `img/${id}.png`);
}

function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function randomItem()
{
	let map0 = 
	[
		{ id: 0, score: 100, chance: 1 },
		{ id: 1, score: 1,   chance: 10 },
		{ id: 2, score: 1,   chance: 10 },
		{ id: 3, score: 2,   chance: 5 },
		{ id: 4, score: 1,   chance: 10 },
		{ id: 5, score: 10,  chance: 2 },
		{ id: 6, score: 2,   chance: 5 }
	];
	
	let map1 = [];
	
	for(let i = 0; i < map0.length; i++)
	{
		for(let j = 0; j < map0[i].chance; j++)
		{
			map1.push(i);
		}
	}
	
	let item = map0[map1[random(0, map1.length - 1)]];
	return { id: item.id, score: item.score };
}

function randomColumn()
{
		let item0 = randomItem();
	let item1 = item0;
	while(item1.id == item0.id)
	{
		item1 = randomItem();
	}
	
	let item2 = item0;
	while(item2.id == item0.id || item2.id == item1.id)
	{
		item2 = randomItem();
	}
	
	return [item0, item1, item2];
}

function reset()
{
	let score = 500;
	$("#score").html(`$${score}`);
	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			setImg(i, j, 0);
		}
	}
	$("#result").html("");
	$("#roll").html("Roll");
	
	$("#roll")[0].onclick = () => 
	{
		score -= 10;
		$("#result").html("");
		
		let columns = [randomColumn(), randomColumn(), randomColumn()];
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				setImg(i, j, columns[i][j].id);
			}
		}
		
		let match = { score: 0 };
		if(columns[0][0].id == columns[1][0].id && columns[0][0].id == columns[2][0].id)
		{
			match = columns[0][0];
		}
		if(columns[0][1].id == columns[1][1].id && columns[0][1].id == columns[2][1].id && match.score < columns[0][1].score)
		{
			match = columns[0][1];
		}
		if(columns[0][2].id == columns[1][2].id && columns[0][2].id == columns[2][2].id && match.score < columns[0][2].score)
		{
			match = columns[0][2];
		}
		
		if(match.score != 0)
		{
			$("#result").html(`Won $${match.score * 10}!`);
			score += match.score * 10;
		}
		
		if(score < 10)
		{
			$("#result").html("Out of money!");
			$("#roll").html("Reset");
			$("#roll")[0].onclick = reset;
		}
		
		$("#score").html(`$${score}`);
	};
}

reset();
<html>
	<head>
		<title>Minesweeper</title>
		<script type="text/javascript" src="function.js"></script>
		<script type="text/javascript" src="class.js"></script>
	</head>
	
	<body>
		<button id="start">Start</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<span id="game_over" style="display: none">Game Over</span>
		<br/><br/>
		<script>
		<!-- PLACE YOUR IMPLEMENTATION BELOW -->

		<?php
			$rows = 15;
			$cols = 15;
			$prob = 0.1;
   
			if (isset($_GET["rows"]))
    			$rows = $_GET["rows"];

			if (isset($_GET["cols"]))
    			$cols = $_GET["cols"];

			if (isset($_GET["prob"]))
    			$prob = $_GET["prob"];
		?>

		let a = new Minesweeper(<?php echo $rows; ?>,<?php echo $cols; ?>,<?php echo $prob; ?>)

		<!-- PLACE YOUR IMPLEMENTATION ABOVE -->
		</script>
	</body>
</html>
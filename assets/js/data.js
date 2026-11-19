let equipment = [
	{name: "Digital Multimeter", lab: "IEC Lab", category: "Measuring Instrument", status: "Available", image: "Digital Multimeter.jpeg", id: 7},
	{name: "DC Power Supply", lab: "IEC Lab", category: "Power Supply", status: "Available", image: "DC Power Supply.jpeg", id: 8},
	{name: "Oscilloscope", lab: "Electronic Device Lab", category: "Measuring Instrument", status: "Available", image: "oscilloscope.jpeg", id: 12},
	{name: "Function Generator", lab: "Electronic Device Lab", category: "Signal Generator", status: "Booked", image: "Function Generator.jpeg", id: 15},
	{name: "Digital Logic Trainer Kit", lab: "Digital Logic and Circuits Lab", category: "Trainer Kit", status: "Available", image: "Digital Logic Trainer Kit.jpeg", id: 20},
	{name: "8086 Microprocessor Trainer Kit", lab: "Microprocessor Lab", category: "Trainer Kit", status: "Booked", image: "8086 Microprocessor Trainer Kit.jpeg", id: 25},
]

let reservations = [
	{id: 101, equipment: "Oscilloscope", lab: "Electronic Device Lab", time: "10-11-2026 10:00-12:20", status: "Approved"},
	{id: 102, equipment: "Digital Multimeter", lab: "IEC Lab", time: "8-11-2026 15:00-17:20", status: "Pending"},
	{id: 98, equipment: "Digital Logic Trainer Kit", lab: "Digital Logic and Circuits Lab", time: "20-10-2026 09:00-10:00", status: "Completed"},
	{id: 96, equipment: "8086 Microprocessor Trainer Kit", lab: "Microprocessor Lab", time: "18-10-2026 11:00-12:00", status: "Completed"},
]

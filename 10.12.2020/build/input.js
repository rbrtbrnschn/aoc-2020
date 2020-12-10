"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleInput = `16
10
15
5
1
11
7
19
6
12
4`;
const properInput = `153
69
163
123
89
4
135
9
124
74
141
132
75
3
18
134
84
15
61
91
90
98
99
51
131
166
127
77
106
50
22
70
43
28
41
160
44
117
66
60
76
17
138
105
97
161
116
49
104
169
71
100
16
54
168
42
57
103
1
32
110
48
12
143
112
82
25
81
148
133
144
118
80
63
156
88
47
115
36
2
94
128
35
62
109
29
40
19
37
122
142
167
7
147
121
159
87
83
111
162
150
8
149`;
const testingInput = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
const isTesting = false;
const input = !isTesting ? properInput : testingInput;
exports.default = input.split("\n");
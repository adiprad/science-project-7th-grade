--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: questioninfo; Type: TABLE; Schema: public; Owner: reportuser; Tablespace: 
--

CREATE TABLE questioninfo (
    id integer NOT NULL,
    question_type integer NOT NULL,
    user_id integer,
    score_percent real NOT NULL,
    time_taken integer NOT NULL,
    distraction_id integer NOT NULL,
    CONSTRAINT distraction_id_numeric CHECK ((distraction_id >= 0)),
    CONSTRAINT question_type_numeric CHECK ((question_type > 0)),
    CONSTRAINT score_percent_check CHECK (((score_percent >= (0)::double precision) AND (score_percent <= (1)::double precision))),
    CONSTRAINT time_taken_numeric CHECK ((time_taken > 0)),
    CONSTRAINT user_id_numeric CHECK ((user_id > 0))
);


ALTER TABLE questioninfo OWNER TO reportuser;

--
-- Name: questioninfo_id_seq; Type: SEQUENCE; Schema: public; Owner: reportuser
--

CREATE SEQUENCE questioninfo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE questioninfo_id_seq OWNER TO reportuser;

--
-- Name: questioninfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reportuser
--

ALTER SEQUENCE questioninfo_id_seq OWNED BY questioninfo.id;


--
-- Name: userinfo; Type: TABLE; Schema: public; Owner: reportuser; Tablespace: 
--

CREATE TABLE userinfo (
    id integer NOT NULL,
    user_data jsonb NOT NULL,
    CONSTRAINT adult_age CHECK (((user_data ->> 'age'::text) >= '18'::text)),
    CONSTRAINT distraction_amt_check CHECK ((((user_data ->> 'distraction_amt'::text) >= '0'::text) AND ((user_data ->> 'distraction_amt'::text) <= '3'::text))),
    CONSTRAINT email_not_null CHECK ((char_length((user_data ->> 'email'::text)) > 0)),
    CONSTRAINT name_not_null CHECK ((char_length((user_data ->> 'name'::text)) > 0))
);


ALTER TABLE userinfo OWNER TO reportuser;

--
-- Name: userinfo_id_seq; Type: SEQUENCE; Schema: public; Owner: reportuser
--

CREATE SEQUENCE userinfo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userinfo_id_seq OWNER TO reportuser;

--
-- Name: userinfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reportuser
--

ALTER SEQUENCE userinfo_id_seq OWNED BY userinfo.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reportuser
--

ALTER TABLE ONLY questioninfo ALTER COLUMN id SET DEFAULT nextval('questioninfo_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reportuser
--

ALTER TABLE ONLY userinfo ALTER COLUMN id SET DEFAULT nextval('userinfo_id_seq'::regclass);


--
-- Data for Name: questioninfo; Type: TABLE DATA; Schema: public; Owner: reportuser
--

COPY questioninfo (id, question_type, user_id, score_percent, time_taken, distraction_id) FROM stdin;
194	1	77	1	17	1
195	2	77	0.600000024	20	1
196	3	77	0.5	82	1
197	4	77	1	17	1
198	5	77	1	35	1
199	6	77	0.389999986	100	1
200	7	77	1	14	1
201	8	77	1	15	1
202	9	77	0.670000017	54	1
203	10	77	1	14	1
204	11	77	0.600000024	15	1
205	12	77	0.639999986	64	1
206	13	77	1	14	1
207	14	77	0.400000006	15	1
208	15	77	0.670000017	52	1
211	1	167	1	94	1
212	2	167	0	50	1
213	3	167	0.709999979	56	1
214	4	167	0	100	1
215	5	167	1	30	1
216	6	167	0.639999986	65	1
217	7	167	0.200000003	80	1
218	8	167	1	35	1
219	9	167	0.389999986	90	1
220	10	167	1	20	1
221	11	167	1	30	1
222	12	167	0.639999986	67	1
223	13	167	1	14	1
224	14	167	1	25	1
225	15	167	0.469999999	84	1
226	1	83	1	20	1
227	2	83	1	30	1
228	3	83	0.550000012	64	1
229	4	83	1	27	1
230	5	83	1	20	1
231	6	83	0.529999971	70	1
232	7	83	1	17	1
233	8	83	1	15	1
234	9	83	0.469999999	72	1
235	10	83	1	14	1
236	11	83	1	20	1
237	12	83	0.430000007	70	1
238	13	83	1	14	1
239	14	83	1	25	1
240	15	83	0.360000014	87	1
263	1	89	1	64	2
264	2	89	1	40	2
265	3	89	0.5	100	2
266	4	89	1	17	2
267	5	89	0.400000006	30	2
268	6	89	0.529999971	100	2
269	7	89	0.600000024	17	2
270	8	89	1	30	2
271	9	89	0.550000012	82	2
272	10	89	1	14	2
273	11	89	0.800000012	45	2
274	12	89	0.550000012	67	2
275	13	89	1	20	2
276	14	89	1	35	2
277	15	89	0.419999987	99	2
293	1	233	1	10	1
294	1	232	0	10	1
295	2	232	0.400000006	80	1
296	2	233	0	100	1
297	3	232	0.469999999	100	1
298	3	233	0.75	54	1
299	4	233	1	14	1
300	4	232	0.800000012	17	1
301	5	232	0.600000024	20	1
302	5	233	0	100	1
303	6	232	0.579999983	72	1
304	7	232	0.800000012	14	1
305	6	233	0.550000012	70	1
306	7	233	1	10	1
307	8	232	0.400000006	35	1
308	8	233	0.400000006	20	1
309	9	232	0.600000024	64	1
310	10	232	0.600000024	17	1
311	11	232	0.400000006	15	1
312	9	233	0.639999986	52	1
313	12	232	0.600000024	67	1
314	10	233	1	14	1
315	13	232	1	10	1
316	14	232	0.400000006	20	1
317	11	233	0.400000006	20	1
318	15	232	0.639999986	59	1
319	12	233	0.600000024	64	1
320	13	233	1	14	1
321	14	233	0.600000024	15	1
322	15	233	0.860000014	44	1
323	1	75	0.800000012	37	0
324	2	75	1	85	0
325	3	75	0.709999979	100	0
326	4	75	1	30	0
327	5	75	1	50	0
328	6	75	1	64	0
329	7	75	0.800000012	27	0
330	8	75	1	25	0
331	9	75	0.529999971	100	0
332	10	75	1	17	0
333	11	75	1	30	0
334	12	75	0.639999986	79	0
335	13	75	0.800000012	24	0
336	14	75	1	45	0
337	15	75	0.529999971	100	0
338	1	78	1	14	1
339	2	78	1	80	1
340	1	85	1	20	2
341	3	78	0.800000012	47	1
342	4	78	1	24	1
343	2	85	1	45	2
344	5	78	1	95	1
345	6	78	0.930000007	37	1
346	3	85	0.709999979	100	2
347	7	78	1	14	1
348	8	78	1	65	1
349	4	85	0	17	2
350	1	139	1	17	0
351	5	85	1	40	2
352	9	78	0.550000012	89	1
353	10	78	1	14	1
354	6	85	0.670000017	64	2
355	11	78	1	70	1
356	2	139	0	100	0
357	7	85	1	10	2
359	13	78	0.800000012	14	1
360	8	85	1	30	2
361	14	78	1	80	1
362	9	85	0.479999989	82	2
363	10	85	0.800000012	17	2
364	15	78	0.670000017	62	1
365	3	139	0.479999989	75	0
366	11	85	1	40	2
367	4	139	1	27	0
368	5	139	0	100	0
369	12	85	0.370000005	92	2
370	13	85	1	14	2
371	6	139	0.5	72	0
372	14	85	1	35	2
373	7	139	1	20	0
374	8	139	1	25	0
375	15	85	0.670000017	52	2
376	9	139	0.5	65	0
377	10	139	1	17	0
378	11	139	1	35	0
379	12	139	0.469999999	79	0
380	13	139	1	30	0
381	14	139	1	25	0
382	15	139	0.469999999	84	0
383	1	246	1	14	1
384	2	246	0.400000006	35	1
385	3	246	0.639999986	74	1
386	4	246	1	10	1
387	5	246	0.400000006	20	1
388	6	246	0.550000012	100	1
389	7	246	0.800000012	10	1
390	8	246	0.600000024	15	1
391	9	246	0.550000012	79	1
392	10	246	0.800000012	14	1
393	11	246	0	35	1
394	12	246	0.800000012	60	1
395	13	246	1	10	1
396	14	246	1	25	1
397	15	246	0.449999988	92	1
398	1	97	1	24	3
399	2	97	1	50	3
400	3	97	0.639999986	87	3
401	4	97	1	44	3
402	5	97	1	30	3
403	6	97	0.670000017	60	3
404	7	97	1	17	3
405	8	97	1	50	3
406	9	97	0.5	84	3
407	10	97	1	20	3
408	11	97	1	35	3
409	12	97	0.529999971	84	3
410	13	97	1	17	3
411	14	97	1	25	3
412	15	97	0.550000012	72	3
413	12	78	1	50	1
414	1	81	0.800000012	67	3
415	1	165	1	20	0
416	2	165	1	30	0
417	2	81	0	100	3
418	3	165	0.550000012	84	0
419	4	165	1	17	0
420	3	81	0.529999971	92	3
421	5	165	0.800000012	20	0
422	6	165	0.469999999	87	0
423	4	81	0.800000012	50	3
424	7	165	1	14	0
425	5	81	0.400000006	15	3
426	8	165	1	35	0
427	6	81	0.860000014	49	3
428	9	165	0.550000012	74	0
429	10	165	1	14	0
430	1	95	1	40	1
431	7	81	1	17	3
432	11	165	1	60	0
433	8	81	1	65	3
434	12	165	0.400000006	100	0
435	13	165	1	14	0
436	14	165	1	45	0
437	9	81	0.469999999	82	3
438	10	81	1	20	3
439	15	165	0.600000024	67	0
440	2	95	0	100	1
441	11	81	1	25	3
442	12	81	0.670000017	60	3
444	3	95	0.800000012	80	1
445	14	81	1	35	3
446	15	81	0.389999986	89	3
447	4	95	1	30	1
448	5	95	1	56	1
449	6	95	0.930000007	64	1
450	7	95	1	20	1
451	8	95	1	40	1
452	9	95	0.639999986	100	1
453	10	95	1	24	1
454	11	95	1	30	1
455	12	95	0.709999979	77	1
456	13	95	1	24	1
457	14	95	1	40	1
458	15	95	0.600000024	90	1
459	1	275	1	20	3
460	2	275	0	100	3
461	1	164	0.800000012	37	0
462	2	164	1	100	0
463	3	275	0.600000024	69	3
464	4	275	1	17	3
465	3	164	0.449999988	100	0
466	5	275	0	100	3
467	4	164	0.600000024	17	0
468	5	164	0.800000012	50	0
469	6	275	0.709999979	56	3
470	6	164	0.419999987	80	0
471	7	275	1	17	3
472	7	164	1	17	0
473	8	164	1	25	0
474	8	275	1	30	3
475	9	164	0.389999986	94	0
477	9	275	0.600000024	56	3
478	11	164	1	30	0
479	10	275	1	14	3
480	11	275	1	40	3
481	12	164	0.370000005	100	0
482	13	164	0.800000012	14	0
483	14	164	1	50	0
484	12	275	0.529999971	65	3
485	15	164	0.419999987	84	0
486	13	275	1	17	3
487	14	275	1	35	3
488	15	275	0.670000017	52	3
489	1	267	1	20	2
490	2	267	1	60	2
491	3	267	0.479999989	79	2
492	4	267	1	10	2
493	5	267	1	65	2
494	6	267	0.550000012	57	2
495	7	267	1	10	2
496	8	267	1	50	2
497	9	267	0.670000017	56	2
498	10	267	1	10	2
499	11	267	1	15	2
500	12	267	0.639999986	52	2
501	13	267	1	14	2
502	14	267	0.800000012	40	2
503	1	264	1	14	2
504	15	267	0.469999999	65	2
505	2	264	1	20	2
506	3	264	0.75	59	2
507	4	264	1	14	2
508	5	264	1	25	2
509	6	264	0.639999986	67	2
510	7	264	1	14	2
511	8	264	1	25	2
512	9	264	0.930000007	47	2
513	10	264	1	10	2
514	11	264	1	20	2
515	12	264	0.75	54	2
516	13	264	1	14	2
517	14	264	1	20	2
518	15	264	0.529999971	79	2
519	1	86	0.800000012	24	3
520	2	86	0	100	3
522	4	86	1	20	3
523	5	86	0.400000006	40	3
524	6	86	0.75	100	3
525	7	86	1	17	3
526	8	86	0.600000024	20	3
527	9	86	0.579999983	100	3
528	10	86	1	17	3
529	11	86	0.400000006	15	3
530	12	86	0.670000017	82	3
531	13	86	0.800000012	20	3
532	14	86	0.800000012	20	3
533	15	86	0.5	92	3
534	3	86	0.5	100	3
535	10	164	0.800000012	50	0
536	13	81	0.800000012	50	3
537	2	252	1	45	0
538	3	252	0.860000014	72	0
539	4	252	1	27	0
540	5	252	0.800000012	50	0
541	6	252	1	65	0
542	7	252	1	30	0
543	8	252	1	65	0
544	9	252	1	80	0
545	10	252	1	27	0
546	11	252	1	56	0
547	1	239	1	17	1
548	2	239	0.800000012	20	1
549	12	252	0.670000017	95	0
550	3	239	0.579999983	65	1
551	13	252	1	24	0
552	4	239	1	17	1
553	14	252	1	30	0
554	5	239	1	25	1
555	6	239	0.550000012	72	1
556	15	252	0.800000012	77	0
557	7	239	1	14	1
558	8	239	1	25	1
559	9	239	0.800000012	45	1
560	10	239	1	14	1
561	11	239	1	30	1
562	1	251	1	30	0
563	12	239	0.639999986	60	1
564	13	239	1	17	1
565	14	239	0.800000012	25	1
566	2	251	0	100	0
567	15	239	0.930000007	40	1
568	3	251	0.930000007	85	0
569	4	251	1	24	0
570	5	251	0	100	0
571	6	251	0.670000017	100	0
572	7	251	0.800000012	30	0
573	8	251	1	90	0
574	9	251	0.670000017	92	0
575	10	251	1	27	0
576	11	251	1	70	0
577	12	251	0.639999986	100	0
578	13	251	1	30	0
579	14	251	1	40	0
580	15	251	0.639999986	100	0
581	1	252	0.800000012	50	0
\.


--
-- Name: questioninfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('questioninfo_id_seq', 581, true);


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: reportuser
--

COPY userinfo (id, user_data) FROM stdin;
222	{"age": "25", "name": "Demo 07", "email": "demo07@gmail.com", "distraction_amt": "3"}
228	{"age": "25", "name": "Demo 38", "email": "demo38@gmail.com", "distraction_amt": "3"}
231	{"age": "25", "name": "Demo 47", "email": "demo47@gmail.com", "distraction_amt": "3"}
237	{"age": "36", "name": "Jung Jae", "email": "jungjae@gmail.com", "distraction_amt": "3"}
249	{"age": "39", "name": "Sanjith Kumar Kodangil", "email": "sanjithkumar.kodangil@capitalone.com", "distraction_amt": "3"}
84	{"age": "40", "name": "Jeffrey Michel", "email": "jeffrey.michel@capitalone.com", "distraction_amt": "3"}
94	{"age": "42", "name": "Paul Hendricks", "email": "paul.hendricks@capitalone.com", "distraction_amt": "2"}
75	{"age": "51", "name": "Govind Pande", "email": "govind.pande@capitalone.com", "distraction_amt": "0"}
76	{"age": "35", "name": "Mark Mikkelson", "email": "mark.mikkelson@capitalone.com", "distraction_amt": "0"}
77	{"age": "27", "name": "Agnibrata Nayak", "email": "agnibrata.nayak@capitalone.com", "distraction_amt": "1"}
78	{"age": "27", "name": "Durga Bidaye", "email": "durga.bidaye@capitalone.com", "distraction_amt": "1"}
79	{"age": "30", "name": "Sunil Palla", "email": "sunil.palla@capitalone.com", "distraction_amt": "2"}
80	{"age": "42", "name": "Rao Dasari", "email": "madhusudhana.dasari@capitalone.com", "distraction_amt": "0"}
81	{"age": "25", "name": "Rahul Sharma", "email": "rahul.sharma@capitalone.com", "distraction_amt": "3"}
82	{"age": "40", "name": "Theodore Kayes", "email": "theodore.kayes@capitalone.com", "distraction_amt": "3"}
83	{"age": "45", "name": "Keith Gasser", "email": "keith.gasser@capitalone.com", "distraction_amt": "1"}
85	{"age": "40", "name": "Latha Madireddy", "email": "latha.madireddy@capitalone.com", "distraction_amt": "2"}
86	{"age": "40", "name": "Pari Prakasam", "email": "pari.prakasam@capitalone.com", "distraction_amt": "3"}
87	{"age": "40", "name": "Sanjay Chakravarty", "email": "sanjay.chakravarty@capitalone.com", "distraction_amt": "0"}
89	{"age": "45", "name": "Prabu Ramachandran", "email": "prabu.ramachandran@capitalone.com", "distraction_amt": "2"}
90	{"age": "40", "name": "Rohit Joshi", "email": "rohit.joshi@capitalone.com", "distraction_amt": "2"}
91	{"age": "40", "name": "Vijay Vemuri", "email": "vijay.vemuri@capitalone.com", "distraction_amt": "3"}
92	{"age": "45", "name": "Sathiya Thiruvengadathan", "email": "sathiya.thiruvengadathan@capitalone.com", "distraction_amt": "2"}
93	{"age": "48", "name": "Meenal Veerappan", "email": "meenal.veerappan@capitalone.com", "distraction_amt": "0"}
95	{"age": "43", "name": "Prasad Sangle", "email": "prasad.sangle@capitalone.com", "distraction_amt": "1"}
96	{"age": "30", "name": "Vijay Chenreddy", "email": "vijay.chenreddy@capitalone.com", "distraction_amt": "3"}
97	{"age": "33", "name": "Binoy Manikoth", "email": "binoy.manikoth@capitalone.com", "distraction_amt": "3"}
98	{"age": "42", "name": "Abhijit Punje", "email": "abhijit.punje@capitalone.com", "distraction_amt": "2"}
99	{"age": "25", "name": "Demo 01", "email": "demo01@gmail.com", "distraction_amt": "0 "}
100	{"age": "25", "name": "Demo 02", "email": "demo02@gmail.com", "distraction_amt": "0 "}
101	{"age": "25", "name": "Demo 05", "email": "demo05@gmail.com", "distraction_amt": "2 "}
104	{"age": "25", "name": "Demo 06", "email": "demo06@gmail.com", "distraction_amt": "2 "}
105	{"age": "25", "name": "Demo 04", "email": "demo04@gmail.com", "distraction_amt": "1 "}
107	{"age": "25", "name": "Demo 14", "email": "demo14@gmail.com", "distraction_amt": "1 "}
110	{"age": "25", "name": "Demo 16", "email": "demo16@gmail.com", "distraction_amt": "2 "}
109	{"age": "25", "name": "Demo 12", "email": "demo12@gmail.com", "distraction_amt": "0 "}
108	{"age": "25", "name": "Demo 13", "email": "demo13@gmail.com", "distraction_amt": "1 "}
111	{"age": "25", "name": "Demo 11", "email": "demo11@gmail.com", "distraction_amt": "0 "}
113	{"age": "25", "name": "Demo 24", "email": "demo24@gmail.com", "distraction_amt": "1 "}
114	{"age": "25", "name": "Demo 22", "email": "demo22@gmail.com", "distraction_amt": "0 "}
115	{"age": "25", "name": "Demo 26", "email": "demo26@gmail.com", "distraction_amt": "2 "}
117	{"age": "25", "name": "Demo 15", "email": "demo15@gmail.com", "distraction_amt": "2 "}
119	{"age": "25", "name": "Demo 36", "email": "demo36@gmail.com", "distraction_amt": "2 "}
120	{"age": "25", "name": "Demo 21", "email": "demo21@gmail.com", "distraction_amt": "0 "}
121	{"age": "25", "name": "Demo 25", "email": "demo25@gmail.com", "distraction_amt": "2 "}
122	{"age": "25", "name": "Demo 44", "email": "demo44@gmail.com", "distraction_amt": "1 "}
124	{"age": "25", "name": "Demo 31", "email": "demo31@gmail.com", "distraction_amt": "0 "}
126	{"age": "25", "name": "Demo 32", "email": "demo32@gmail.com", "distraction_amt": "0 "}
127	{"age": "25", "name": "Demo 34", "email": "demo34@gmail.com", "distraction_amt": "1 "}
129	{"age": "25", "name": "Demo 23", "email": "demo23@gmail.com", "distraction_amt": "1 "}
130	{"age": "25", "name": "Demo 42", "email": "demo42@gmail.com", "distraction_amt": "0 "}
131	{"age": "25", "name": "Demo 45", "email": "demo45@gmail.com", "distraction_amt": "2 "}
132	{"age": "25", "name": "Demo 46", "email": "demo46@gmail.com", "distraction_amt": "2 "}
134	{"age": "25", "name": "Demo 33", "email": "demo33@gmail.com", "distraction_amt": "1 "}
135	{"age": "25", "name": "Demo 35", "email": "demo35@gmail.com", "distraction_amt": "2 "}
136	{"age": "25", "name": "Demo 43", "email": "demo43@gmail.com", "distraction_amt": "1 "}
138	{"age": "25", "name": "Demo 41", "email": "demo41@gmail.com", "distraction_amt": "0 "}
139	{"age": "27", "name": "Narahari Shankarnarayana", "email": "narahari.shettyhallishankarnarayana@capitalone.com", "distraction_amt": "0"}
223	{"age": "25", "name": "Demo 08", "email": "demo08@gmail.com", "distraction_amt": "3"}
238	{"age": "40", "name": "Nitai Mukhopadhyay", "email": "nitaimukh@gmail.com", "distraction_amt": "1"}
165	{"age": "30", "name": "Vinayak Hulawale", "email": "vinayak.hulawale@capitalone.com", "distraction_amt": "0"}
250	{"age": "40", "name": "Kevin Farnsworth", "email": "klfarnsworth@hotmail.com", "distraction_amt": "0"}
263	{"age": "40", "name": "Nancy Cochran", "email": "ncochran@sbkfinancial.com", "distraction_amt": "0"}
274	{"age": "40", "name": "Cary", "email": "cary.zhou@capitalone.com", "distraction_amt": "3"}
224	{"age": "25", "name": "Demo 17", "email": "demo17@gmail.com", "distraction_amt": "3"}
229	{"age": "25", "name": "Demo 48", "email": "demo48@gmail.com", "distraction_amt": "3"}
168	{"age": "40", "name": "Sathiya Shunmugasundaram", "email": "sathiya.shunmugasundaram@capitalone.com", "distraction_amt": "2"}
239	{"age": "35", "name": "Matthew Cannell", "email": "matt_cannell@hotmail.com", "distraction_amt": "1"}
251	{"age": "30", "name": "Sreejith Viswanathan", "email": "sreejith6@yahoo.co.in", "distraction_amt": "0"}
264	{"age": "40", "name": "Sarah Harris", "email": "sharris@sbkfinancial.com", "distraction_amt": "2"}
265	{"age": "40", "name": "Stephanie Stumpf", "email": "sstumpf@sbkfinancial.com", "distraction_amt": "3"}
280	{"age": "40", "name": "Kranthi", "email": "kranthikumar.katepalli@capitalone.com", "distraction_amt": "3"}
225	{"age": "25", "name": "Demo 18", "email": "demo18@gmail.com", "distraction_amt": "3"}
240	{"age": "40", "name": "Das", "email": "sarada.das@gmail.com", "distraction_amt": "2"}
252	{"age": "30", "name": "Snisha", "email": "snisha_s@yahoo.com", "distraction_amt": "0"}
266	{"age": "40", "name": "Teresa Mozingo", "email": "tmozingo@sbkfinancial.com", "distraction_amt": "0"}
166	{"age": "50", "name": "Zhiwei Zhang", "email": "zhiwei.zhang@capitalone.com", "distraction_amt": "0"}
226	{"age": "25", "name": "Demo 27", "email": "demo27@gmail.com", "distraction_amt": "3"}
241	{"age": "38", "name": "Abhi Suki", "email": "abhisuki@gmail.com", "distraction_amt": "2"}
169	{"age": "41", "name": "Senthil Kumar Suriyanarayanan", "email": "senthilkumar.suriyanarayanan@capitalone.com", "distraction_amt": "2"}
253	{"age": "40", "name": "Ajay Madathil", "email": "ajaymaadathil@gmail.com", "distraction_amt": "0"}
254	{"age": "40", "name": "Vinodh Madathil", "email": "vinodhmadathil@gmail.com", "distraction_amt": "0"}
267	{"age": "40", "name": "Nicole", "email": "nboike@sbkfinancial.com", "distraction_amt": "2"}
227	{"age": "25", "name": "Demo 28", "email": "demo28@gmail.com", "distraction_amt": "3"}
242	{"age": "38", "name": "Abhilasha Punje", "email": "ashup20@yahoo.com", "distraction_amt": "3"}
167	{"age": "40", "name": "Sri Chadalavada", "email": "sri.chadalavada@capitalone.com", "distraction_amt": "1"}
255	{"age": "40", "name": "Amanda Schwab", "email": "aschwab@sbkfinancial.com", "distraction_amt": "0"}
102	{"age": "25", "name": "Demo 03", "email": "demo03@gmail.com", "distraction_amt": "2"}
230	{"age": "25", "name": "Demo 37", "email": "demo37@gmail.com", "distraction_amt": "3"}
243	{"age": "41", "name": "Rupali Sangle", "email": "rupali00us@yahoo.com", "distraction_amt": "3"}
256	{"age": "40", "name": "Andrea Broughton", "email": "abroughton@sbkfinancial.com", "distraction_amt": "2"}
268	{"age": "40", "name": "Sharat", "email": "sharat.tadimalla@capitalone.com", "distraction_amt": "3"}
272	{"age": "40", "name": "Francis", "email": "francis.acu@capitalone.com", "distraction_amt": "3"}
275	{"age": "40", "name": "Bharath", "email": "bharathbhushan.sreeravindra@capitalone.com", "distraction_amt": "3"}
285	{"age": "50", "name": "Nutan Pande", "email": "nutanpande@yahoo.com", "distraction_amt": "2"}
232	{"age": "49", "name": "Raj Mounasamy", "email": "orthovcu@gmail.com", "distraction_amt": "1"}
244	{"age": "40", "name": "Sindhu Prabu", "email": "sindhu.prabu@gmail.com", "distraction_amt": "2"}
257	{"age": "40", "name": "Carol Bollinger", "email": "cbollinger@sbkfinancial.com", "distraction_amt": "2"}
269	{"age": "40", "name": "Sumod", "email": "sumod.soman@capitalone.com", "distraction_amt": "3"}
286	{"age": "35", "name": "Srinivas", "email": "srinivasklp@capitalone.com", "distraction_amt": "3"}
233	{"age": "38", "name": "Becky Gelrud", "email": "rlrgelrud@gmail.com", "distraction_amt": "1"}
234	{"age": "41", "name": "Adam Gelrud", "email": "akgelrud@gmail.com", "distraction_amt": "2"}
245	{"age": "40", "name": "Purushottam Thakare", "email": "pgthakare@yahoo.com", "distraction_amt": "1"}
258	{"age": "40", "name": "Claire Craighill", "email": "ccraighill@sbkfinancial.com", "distraction_amt": "3"}
270	{"age": "40", "name": "Malathi", "email": "malathi.vakkalanka@capitalone.com", "distraction_amt": "3"}
235	{"age": "35", "name": "Kelly Jessup", "email": "kgjessup@gmail.com", "distraction_amt": "2"}
246	{"age": "40", "name": "Mathew Alexander", "email": "mathewnita@gmail.com", "distraction_amt": "1"}
247	{"age": "38", "name": "Sujatha Ramesh", "email": "sujatharamesh@hotmail.com", "distraction_amt": "0"}
259	{"age": "40", "name": "Kevin King", "email": "kking@sbkfinancial.com", "distraction_amt": "0"}
271	{"age": "40", "name": "Naveen", "email": "naveen.chandran@capitalone.com", "distraction_amt": "3"}
236	{"age": "35", "name": "David Jessup", "email": "jessupdave@gmail.com", "distraction_amt": "3"}
164	{"age": "32", "name": "Ashish Kapoor", "email": "ashish.kapoor@capitalone.com", "distraction_amt": "0"}
170	{"age": "25", "name": "demoDist", "email": "demodist@gmail.com", "distraction_amt": "3"}
171	{"age": "25", "name": "Demo 00", "email": "demo00@gmail.com", "distraction_amt": "0"}
248	{"age": "40", "name": "Ramesh", "email": "a_ramesh8@hotmail.com", "distraction_amt": "2"}
261	{"age": "40", "name": "Matt Romeo", "email": "mromeo@sbkfinancial.com", "distraction_amt": "2"}
262	{"age": "40", "name": "Michael Whitlock", "email": "mwhitlock@sbkfinancial.com", "distraction_amt": "3"}
260	{"age": "40", "name": "Mary Lee Morris", "email": "marylee.morris@sbkfinancial.com", "distraction_amt": "2"}
273	{"age": "40", "name": "Joe", "email": "joe.taylor@capitalone.com", "distraction_amt": "3"}
\.


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('userinfo_id_seq', 286, true);


--
-- Name: questioninfo_pkey; Type: CONSTRAINT; Schema: public; Owner: reportuser; Tablespace: 
--

ALTER TABLE ONLY questioninfo
    ADD CONSTRAINT questioninfo_pkey PRIMARY KEY (id);


--
-- Name: userinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: reportuser; Tablespace: 
--

ALTER TABLE ONLY userinfo
    ADD CONSTRAINT userinfo_pkey PRIMARY KEY (id);


--
-- Name: userinfo_email; Type: INDEX; Schema: public; Owner: reportuser; Tablespace: 
--

CREATE UNIQUE INDEX userinfo_email ON userinfo USING btree (((user_data ->> 'email'::text)));


--
-- Name: questioninfo_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reportuser
--

ALTER TABLE ONLY questioninfo
    ADD CONSTRAINT questioninfo_user_id_fkey FOREIGN KEY (user_id) REFERENCES userinfo(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


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
\.


--
-- Name: questioninfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('questioninfo_id_seq', 262, true);


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: reportuser
--

COPY userinfo (id, user_data) FROM stdin;
75	{"age": "51", "name": "Govind Pande", "email": "govind.pande@capitalone.com", "distraction_amt": "0"}
76	{"age": "35", "name": "Mark Mikkelson", "email": "mark.mikkelson@capitalone.com", "distraction_amt": "0"}
77	{"age": "27", "name": "Agnibrata Nayak", "email": "agnibrata.nayak@capitalone.com", "distraction_amt": "1"}
78	{"age": "27", "name": "Durga Bidaye", "email": "durga.bidaye@capitalone.com", "distraction_amt": "1"}
79	{"age": "30", "name": "Sunil Palla", "email": "sunil.palla@capitalone.com", "distraction_amt": "2"}
80	{"age": "42", "name": "Rao Dasari", "email": "madhusudhana.dasari@capitalone.com", "distraction_amt": "0"}
81	{"age": "25", "name": "Rahul Sharma", "email": "rahul.sharma@capitalone.com", "distraction_amt": "3"}
82	{"age": "40", "name": "Theodore Kayes", "email": "theodore.kayes@capitalone.com", "distraction_amt": "3"}
83	{"age": "45", "name": "Keith Gasser", "email": "keith.gasser@capitalone.com", "distraction_amt": "1"}
84	{"age": "40", "name": "Jeffrey Michel", "email": "jeffrey.michel@capitalone.com", "distraction_amt": "1"}
85	{"age": "40", "name": "Latha Madireddy", "email": "latha.madireddy@capitalone.com", "distraction_amt": "2"}
86	{"age": "40", "name": "Pari Prakasam", "email": "pari.prakasam@capitalone.com", "distraction_amt": "3"}
87	{"age": "40", "name": "Sanjay Chakravarty", "email": "sanjay.chakravarty@capitalone.com", "distraction_amt": "0"}
89	{"age": "45", "name": "Prabu Ramachandran", "email": "prabu.ramachandran@capitalone.com", "distraction_amt": "2"}
90	{"age": "40", "name": "Rohit Joshi", "email": "rohit.joshi@capitalone.com", "distraction_amt": "2"}
91	{"age": "40", "name": "Vijay Vemuri", "email": "vijay.vemuri@capitalone.com", "distraction_amt": "3"}
92	{"age": "45", "name": "Sathiya Thiruvengadathan", "email": "sathiya.thiruvengadathan@capitalone.com", "distraction_amt": "2"}
93	{"age": "48", "name": "Meenal Veerappan", "email": "meenal.veerappan@capitalone.com", "distraction_amt": "0"}
94	{"age": "42", "name": "Paul Hendricks", "email": "paul.hendricks@capitalone.com", "distraction_amt": "1"}
95	{"age": "43", "name": "Prasad Sangle", "email": "prasad.sangle@capitalone.com", "distraction_amt": "1"}
96	{"age": "30", "name": "Vijay Chenreddy", "email": "vijay.chenreddy@capitalone.com", "distraction_amt": "3"}
97	{"age": "33", "name": "Binoy Manikoth", "email": "binoy.manikoth@capitalone.com", "distraction_amt": "3"}
98	{"age": "42", "name": "Abhijit Punje", "email": "abhijit.punje@capitalone.com", "distraction_amt": "2"}
99	{"age": "25", "name": "Demo 01", "email": "demo01@gmail.com", "distraction_amt": "0 "}
100	{"age": "25", "name": "Demo 02", "email": "demo02@gmail.com", "distraction_amt": "0 "}
101	{"age": "25", "name": "Demo 05", "email": "demo05@gmail.com", "distraction_amt": "2 "}
102	{"age": "25", "name": "Demo 03", "email": "demo03@gmail.com", "distraction_amt": "1 "}
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
165	{"age": "30", "name": "Vinayak Hulawale", "email": "vinayak.hulawale@capitalone.com", "distraction_amt": "0"}
168	{"age": "40", "name": "Sathiya Shunmugasundaram", "email": "sathiya.shunmugasundaram@capitalone.com", "distraction_amt": "2"}
166	{"age": "50", "name": "Zhiwei Zhang", "email": "zhiwei.zhang@capitalone.com", "distraction_amt": "1"}
169	{"age": "41", "name": "Senthil Kumar Suriyanarayanan", "email": "senthilkumar.suriyanarayanan@capitalone.com", "distraction_amt": "2"}
167	{"age": "40", "name": "Sri Chadalavada", "email": "sri.chadalavada@capitalone.com", "distraction_amt": "1"}
164	{"age": "32", "name": "Ashish Kapoor", "email": "ashish.kapoor@capitalone.com", "distraction_amt": "0"}
170	{"age": "25", "name": "demoDist", "email": "demodist@gmail.com", "distraction_amt": "3"}
171	{"age": "25", "name": "Demo 00", "email": "demo00@gmail.com", "distraction_amt": "0"}
\.


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('userinfo_id_seq', 171, true);


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


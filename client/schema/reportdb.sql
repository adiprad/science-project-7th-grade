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
    CONSTRAINT email_not_null CHECK ((char_length((user_data ->> 'email'::text)) > 0)),
    CONSTRAINT name_not_null CHECK ((char_length((user_data ->> 'name'::text)) > 0)),
    CONSTRAINT distraction_amt_check CHECK (((user_data ->> 'distraction_amt'::text) >= '0'::text) AND (user_data ->> 'distraction_amt'::text) <= '3'::text)
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
\.


--
-- Name: questioninfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('questioninfo_id_seq', 13, true);


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: reportuser
--

COPY userinfo (id, user_data) FROM stdin;
41	{"age": 30, "name": "Dhruv", "email": "dhruv@xyz.com"}
\.


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reportuser
--

SELECT pg_catalog.setval('userinfo_id_seq', 41, true);


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


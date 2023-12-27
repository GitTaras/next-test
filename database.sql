--
-- PostgreSQL database dump
--

-- Dumped from database version 11.22 (Debian 11.22-0+deb10u1)
-- Dumped by pg_dump version 11.22 (Debian 11.22-0+deb10u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    post_id integer,
    user_id integer,
    comment text NOT NULL
);


ALTER TABLE public.comments OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    user_id integer,
    title character varying(150) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.posts OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgresql_20231226203no6yi4lylqmt5wu5;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

COPY public.comments (comment_id, post_id, user_id, comment) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

COPY public.posts (post_id, user_id, title, description) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

COPY public.users (user_id, username) FROM stdin;
1	john
2	dou
3	kiss
\.


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, false);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql_20231226203no6yi4lylqmt5wu5
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


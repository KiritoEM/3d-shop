--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "config3D" jsonb DEFAULT '{"scale": 2.4, "position": [0, 0, 0], "rotation": [0, 0, 0]}'::jsonb NOT NULL,
    price numeric(65,30) NOT NULL,
    "modelPath" text NOT NULL,
    "groundColor" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "categoryId" integer NOT NULL,
    cuid text NOT NULL,
    "customisationConfigs" jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
50988c12-fdaa-41e5-9a9c-69205a9777c6	065a51f53b714a8b9ba971f2a131215367b4d6d64e87800d1466524f0907343d	2025-06-04 22:13:57.184858+03	20250604191356_init	\N	\N	2025-06-04 22:13:57.134227+03	1
ae2db9d9-1b29-494e-8a8d-dd23a9c9bc79	0bae8681193d3f21c836d98236b27f4f4e52abadbe22d973fa944a27c49b2769	2025-06-05 11:14:37.002422+03	20250605081435_add_customisation_configs	\N	\N	2025-06-05 11:14:36.978157+03	1
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Mode & Vestimentaire
2	Maison & Décoration
3	Électronique
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, "config3D", price, "modelPath", "groundColor", "createdAt", "updatedAt", "categoryId", cuid, "customisationConfigs") FROM stdin;
2	Apple watch ultra 2	Explorez l'Apple Watch Ultra 2 et succombez à une montre qui repousse toutes les limites. Pensée pour les aventuriers les plus exigeants, cette montre ultra-résistante vous accompagne dans vos défis les plus extrêmes avec une précision et une endurance exceptionnelles.	{"scale": 50, "rotation": [0.5, -0.3, 0]}	850.000000000000000000000000000000	/uploaded-models/apple_watch_ultra_2.glb	#3A5129	2025-06-04 19:22:25.409	2025-06-04 19:20:56.665	3	cmbic3x8g0001rsyojqyatfgp	{}
1	Iphone 16	Découvrez l'iPhone 16 Pro et laissez-vous séduire par une technologie qui redéfinit les standards. Conçu pour ceux qui exigent le meilleur, ce smartphone premium vous offre une expérience utilisateur incomparable.	{"rotation": [0.35, 0, 0]}	1088000.000000000000000000000000000000	/uploaded-models/iphone_16_pro_max.glb	#585656	2025-06-04 19:20:32.401	2025-06-06 04:45:38.122	3	cmbic1i1d0000rsyor688d61q	{"defaultColor": "#bfa48f", "colorCustomisation": [{"color": "black", "value": "#0a0a0a", "materials": {"flas": "#1c1c1c", "logo": "#1a1a1a", "ereve": "#141414", "screw": "#1d1d1d", "ana_renk": "#0a0a0a"}}, {"color": "gray", "value": "#8c8c8c", "materials": {"flas": "#9b9b9b", "logo": "#8e8e8e", "ereve": "#a2a2a2", "screw": "#919191", "ana_renk": "#8c8c8c"}}, {"color": "white", "value": "#f9f9f9", "materials": {"flas": "#f2f2f2", "logo": "#e8e8e8", "ereve": "#f0f0f0", "screw": "#e2e2e2", "ana_renk": "#f9f9f9"}}]}
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 3, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 2, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product_cuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_cuid_key ON public.product USING btree (cuid);


--
-- Name: product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_name_key ON public.product USING btree (name);


--
-- Name: product product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


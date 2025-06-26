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


--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'SUCCEEDED',
    'FAILED',
    'CANCELED',
    'REFUNDED',
    'PARTIALLY_REFUNDED'
);


ALTER TYPE public."TransactionStatus" OWNER TO postgres;

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
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

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
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "stripePaymentIntentId" text,
    "stripeChargeId" text,
    amount integer NOT NULL,
    currency text DEFAULT 'eur'::text NOT NULL,
    status public."TransactionStatus" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "customerEmail" text NOT NULL,
    "customerName" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_id_seq OWNER TO postgres;

--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text,
    "emailVerified" timestamp(3) without time zone,
    image text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: verification_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_token (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.verification_token OWNER TO postgres;

--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
50988c12-fdaa-41e5-9a9c-69205a9777c6	065a51f53b714a8b9ba971f2a131215367b4d6d64e87800d1466524f0907343d	2025-06-04 22:13:57.184858+03	20250604191356_init	\N	\N	2025-06-04 22:13:57.134227+03	1
ae2db9d9-1b29-494e-8a8d-dd23a9c9bc79	0bae8681193d3f21c836d98236b27f4f4e52abadbe22d973fa944a27c49b2769	2025-06-05 11:14:37.002422+03	20250605081435_add_customisation_configs	\N	\N	2025-06-05 11:14:36.978157+03	1
5bfb3f29-0505-4701-8d83-7e96a8fff932	ddb052713c1994a1cb2ac321f06fa56111f4b9275640f154343632b6501f1fa6	2025-06-10 10:28:16.18827+03	20250610072814_add_transation_model	\N	\N	2025-06-10 10:28:16.125078+03	1
8a32353b-c176-4090-8ad3-f0d9c6300e59	0711b4a6cf1568cc15374eeb1a8527dd31e61e2538b5486e83de2f5f086479aa	2025-06-10 10:37:28.083915+03	20250610073726_add_user_model	\N	\N	2025-06-10 10:37:28.038903+03	1
815088a6-b898-48ac-b557-c95d8e2127b7	b2eae026358af0feced3da74f24d51eb6627533de54ca5de6560cabc0173a208	2025-06-11 11:34:29.761362+03	20250611083428_add_unique_email	\N	\N	2025-06-11 11:34:29.747223+03	1
07ad3a23-f78f-4295-89b1-566bff8e181e	d1ac8d757cae919a33794dad2cd36a8f7b367b79992bf8d43bbe13893f1bcb7f	2025-06-11 13:16:55.138671+03	20250611101653_add_name_to_user	\N	\N	2025-06-11 13:16:55.120657+03	1
2afa2179-9858-4666-b5b1-0cbb0f8e9fe2	11240c643518a36238585fe8e8afacbb0e04db118e58e054e93eb3a2673a3751	2025-06-11 20:46:35.889545+03	20250611174634_addd_nextauth	\N	\N	2025-06-11 20:46:35.755629+03	1
51506d0e-d20e-47d6-9297-0e804b28e43f	3fe866d376643352253606ad456263b1a191dae1d4329e3eecbfc864bbccf346	2025-06-12 15:22:16.689392+03	20250612122215_change_int_into_string_user	\N	\N	2025-06-12 15:22:16.579152+03	1
a6cc9236-660b-4e33-83bb-d300356377ab	ff764b0a65dfc56c2049f3a795fae0a773a9303081ef15d4e32239db2b55c785	2025-06-12 22:10:05.938386+03	20250612191004_make_optional_some_item	\N	\N	2025-06-12 22:10:05.92488+03	1
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
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
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, "createdAt", "stripePaymentIntentId", "stripeChargeId", amount, currency, status, "updatedAt", "customerEmail", "customerName", "userId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, "createdAt", "updatedAt", name, "emailVerified", image) FROM stdin;
cmbtgukcc0001rsywygxahb4q	johankirito64@gmail.com	$2b$10$seXseswA9sd60/cFz4IU3.Kx6JEDVI8s.gLAniyZRzUYw.iTJiAt.	2025-06-12 14:20:34.812	2025-06-12 14:20:34.812	Emadisson Loick	\N	\N
\.


--
-- Data for Name: verification_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_token (identifier, token, expires) FROM stdin;
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
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 1, false);


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
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: verification_token verification_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_token
    ADD CONSTRAINT verification_token_pkey PRIMARY KEY (identifier, token);


--
-- Name: account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON public.account USING btree (provider, "providerAccountId");


--
-- Name: product_cuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_cuid_key ON public.product USING btree (cuid);


--
-- Name: product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_name_key ON public.product USING btree (name);


--
-- Name: session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "session_sessionToken_key" ON public.session USING btree ("sessionToken");


--
-- Name: transaction_stripeChargeId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "transaction_stripeChargeId_key" ON public.transaction USING btree ("stripeChargeId");


--
-- Name: transaction_stripePaymentIntentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "transaction_stripePaymentIntentId_key" ON public.transaction USING btree ("stripePaymentIntentId");


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transaction transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


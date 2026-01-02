import { PrismaClient, MatchStatus } from '@prisma/client';

const prisma = new PrismaClient();

const sportsMatches = [
    // Cricket - IPL
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Mumbai Indians',
        teamB: 'Chennai Super Kings',
        startTime: new Date('2026-04-01T19:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Royal Challengers Bangalore',
        teamB: 'Kolkata Knight Riders',
        startTime: new Date('2026-04-02T15:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
    },
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Delhi Capitals',
        teamB: 'Rajasthan Royals',
        startTime: new Date('2026-04-03T19:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400',
    },
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Punjab Kings',
        teamB: 'Sunrisers Hyderabad',
        startTime: new Date('2026-04-04T19:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Gujarat Titans',
        teamB: 'Lucknow Super Giants',
        startTime: new Date('2026-04-05T15:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
    },
    // Cricket - International
    {
        sport: 'Cricket',
        league: 'ICC World Cup',
        teamA: 'India',
        teamB: 'Australia',
        startTime: new Date('2026-03-15T09:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400',
    },
    {
        sport: 'Cricket',
        league: 'ICC World Cup',
        teamA: 'England',
        teamB: 'South Africa',
        startTime: new Date('2026-03-16T09:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
    {
        sport: 'Cricket',
        league: 'The Ashes',
        teamA: 'Australia',
        teamB: 'England',
        startTime: new Date('2026-01-10T04:00:00Z'),
        status: MatchStatus.LIVE,
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
    },
    // Football - EPL
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        startTime: new Date('2026-01-05T15:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Arsenal',
        teamB: 'Chelsea',
        startTime: new Date('2026-01-06T17:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400',
    },
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Manchester City',
        teamB: 'Tottenham',
        startTime: new Date('2026-01-07T14:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Newcastle United',
        teamB: 'Aston Villa',
        startTime: new Date('2026-01-08T15:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400',
    },
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Brighton',
        teamB: 'West Ham',
        startTime: new Date('2026-01-02T12:30:00Z'),
        status: MatchStatus.LIVE,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    // Football - La Liga
    {
        sport: 'Football',
        league: 'La Liga',
        teamA: 'Real Madrid',
        teamB: 'Barcelona',
        startTime: new Date('2026-01-10T20:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400',
    },
    {
        sport: 'Football',
        league: 'La Liga',
        teamA: 'Atletico Madrid',
        teamB: 'Sevilla',
        startTime: new Date('2026-01-11T18:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400',
    },
    {
        sport: 'Football',
        league: 'La Liga',
        teamA: 'Valencia',
        teamB: 'Villarreal',
        startTime: new Date('2026-01-12T16:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    // Football - Serie A
    {
        sport: 'Football',
        league: 'Serie A',
        teamA: 'AC Milan',
        teamB: 'Inter Milan',
        startTime: new Date('2026-01-15T19:45:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400',
    },
    {
        sport: 'Football',
        league: 'Serie A',
        teamA: 'Juventus',
        teamB: 'Napoli',
        startTime: new Date('2026-01-16T17:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400',
    },
    // Football - Bundesliga
    {
        sport: 'Football',
        league: 'Bundesliga',
        teamA: 'Bayern Munich',
        teamB: 'Borussia Dortmund',
        startTime: new Date('2026-01-18T17:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    {
        sport: 'Football',
        league: 'Bundesliga',
        teamA: 'RB Leipzig',
        teamB: 'Bayer Leverkusen',
        startTime: new Date('2026-01-19T14:30:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400',
    },
    // Tennis - Grand Slams
    {
        sport: 'Tennis',
        league: 'Australian Open',
        teamA: 'Novak Djokovic',
        teamB: 'Carlos Alcaraz',
        startTime: new Date('2026-01-25T09:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    },
    {
        sport: 'Tennis',
        league: 'Australian Open',
        teamA: 'Jannik Sinner',
        teamB: 'Daniil Medvedev',
        startTime: new Date('2026-01-25T11:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    },
    {
        sport: 'Tennis',
        league: 'Australian Open',
        teamA: 'Iga Swiatek',
        teamB: 'Aryna Sabalenka',
        startTime: new Date('2026-01-26T08:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    },
    {
        sport: 'Tennis',
        league: 'Wimbledon',
        teamA: 'Roger Federer',
        teamB: 'Rafael Nadal',
        startTime: new Date('2026-07-10T14:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    },
    {
        sport: 'Tennis',
        league: 'US Open',
        teamA: 'Coco Gauff',
        teamB: 'Elena Rybakina',
        startTime: new Date('2026-09-05T19:00:00Z'),
        status: MatchStatus.UPCOMING,
        thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    },
    // Completed matches
    {
        sport: 'Cricket',
        league: 'IPL',
        teamA: 'Chennai Super Kings',
        teamB: 'Gujarat Titans',
        startTime: new Date('2025-12-28T19:30:00Z'),
        status: MatchStatus.COMPLETED,
        thumbnail: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400',
    },
    {
        sport: 'Football',
        league: 'EPL',
        teamA: 'Liverpool',
        teamB: 'Arsenal',
        startTime: new Date('2025-12-29T17:30:00Z'),
        status: MatchStatus.COMPLETED,
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    },
    {
        sport: 'Tennis',
        league: 'ATP Finals',
        teamA: 'Carlos Alcaraz',
        teamB: 'Jannik Sinner',
        startTime: new Date('2025-12-30T18:00:00Z'),
        status: MatchStatus.COMPLETED,
        thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    },
    {
        sport: 'Football',
        league: 'La Liga',
        teamA: 'Barcelona',
        teamB: 'Real Madrid',
        startTime: new Date('2025-12-31T21:00:00Z'),
        status: MatchStatus.COMPLETED,
        thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400',
    },
    {
        sport: 'Cricket',
        league: 'BBL',
        teamA: 'Sydney Sixers',
        teamB: 'Melbourne Stars',
        startTime: new Date('2026-01-02T10:00:00Z'),
        status: MatchStatus.LIVE,
        thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
];

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await prisma.favorite.deleteMany();
    await prisma.match.deleteMany();
    console.log('✅ Cleared existing matches and favorites');

    // Seed matches
    for (const match of sportsMatches) {
        await prisma.match.create({ data: match });
    }
    console.log(`✅ Created ${sportsMatches.length} matches`);

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

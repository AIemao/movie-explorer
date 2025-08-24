#!/usr/bin/env node

/**
 * 📊 Script de Análise Personalizada de Cobertura de Testes
 *
 * Este script processa o arquivo de cobertura gerado pelo Vitest (coverage-final.json)
 * e fornece uma análise detalhada e visual do estado dos testes no projeto.
 *
 * Funcionalidades:
 * - ✅ Análise individual por arquivo
 * - ✅ Categorização inteligente (boa/parcial/sem cobertura)
 * - ✅ Estatísticas abrangentes do projeto
 * - ✅ Orientações práticas para desenvolvimento
 * - ✅ Suporte para Windows e Unix
 *
 * Uso: npm run coverage:analyze
 *
 * Pré-requisito: Execute primeiro `npm run test:coverage` para gerar dados
 */

import fs from "fs";
import path from "path";

const COVERAGE_FILE = "coverage/coverage-final.json";

function analyzeCoverage() {
  try {
    const coverageData = JSON.parse(fs.readFileSync(COVERAGE_FILE, "utf8"));

    let totalFiles = 0;
    let filesWithTests = 0;
    let filesWithoutTests = 0;
    let totalLines = 0;
    let coveredLines = 0;

    const fileStats = [];
    for (const [filePath, data] of Object.entries(coverageData)) {
      // Filtrar apenas arquivos src/ e excluir arquivos de teste
      const normalizedPath = filePath.replace(/\\/g, "/");
      if (
        !normalizedPath.includes("src/") ||
        normalizedPath.includes(".test.") ||
        normalizedPath.includes("vite-env.d.ts")
      ) {
        continue;
      }

      totalFiles++;
      const relativePath = path
        .relative(process.cwd(), filePath)
        .replace(/\\/g, "/");

      // Calcular cobertura de linhas
      const lines = data.s || {};
      const lineCount = Object.keys(lines).length;
      const coveredLineCount = Object.values(lines).filter(
        (count) => count > 0
      ).length;
      const coveragePercentage =
        lineCount > 0 ? (coveredLineCount / lineCount) * 100 : 0;

      totalLines += lineCount;
      coveredLines += coveredLineCount;

      if (coveragePercentage > 0) {
        filesWithTests++;
      } else {
        filesWithoutTests++;
      }

      fileStats.push({
        path: relativePath,
        coverage: coveragePercentage,
        lines: lineCount,
        coveredLines: coveredLineCount,
        hasCoverage: coveragePercentage > 0,
      });
    }

    const overallCoverage =
      totalLines > 0 ? (coveredLines / totalLines) * 100 : 0;

    console.log("\n🎯 RESUMO PERSONALIZADO DE COBERTURA");
    console.log("==========================================");
    console.log(`📊 Total de arquivos analisados: ${totalFiles}`);
    console.log(
      `✅ Arquivos com testes: ${filesWithTests} (${(
        (filesWithTests / totalFiles) *
        100
      ).toFixed(1)}%)`
    );
    console.log(
      `❌ Arquivos sem testes: ${filesWithoutTests} (${(
        (filesWithoutTests / totalFiles) *
        100
      ).toFixed(1)}%)`
    );
    console.log(`📈 Cobertura geral: ${overallCoverage.toFixed(2)}%`);
    console.log(`📝 Total de linhas: ${totalLines} (${coveredLines} cobertas)`);

    // Arquivos com boa cobertura
    const goodCoverage = fileStats.filter((f) => f.coverage >= 80);
    const partialCoverage = fileStats.filter(
      (f) => f.coverage > 0 && f.coverage < 80
    );
    const noCoverage = fileStats.filter((f) => f.coverage === 0);

    if (goodCoverage.length > 0) {
      console.log("\n🌟 Arquivos com boa cobertura (≥80%):");
      goodCoverage
        .sort((a, b) => b.coverage - a.coverage)
        .forEach((file) => {
          console.log(`   ✅ ${file.path} - ${file.coverage.toFixed(1)}%`);
        });
    }

    if (partialCoverage.length > 0) {
      console.log("\n⚡ Arquivos com cobertura parcial (<80%):");
      partialCoverage
        .sort((a, b) => b.coverage - a.coverage)
        .forEach((file) => {
          console.log(`   🔶 ${file.path} - ${file.coverage.toFixed(1)}%`);
        });
    }

    if (noCoverage.length > 0) {
      console.log("\n🔴 Arquivos sem cobertura:");
      noCoverage
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((file) => {
          console.log(`   ❌ ${file.path} - 0%`);
        });
    }
    console.log("\n📋 Próximos passos sugeridos:");
    if (noCoverage.length > 0) {
      console.log(
        `   • Criar testes para ${noCoverage.length} arquivo(s) sem cobertura`
      );
    }
    if (partialCoverage.length > 0) {
      console.log(
        `   • Melhorar cobertura de ${partialCoverage.length} arquivo(s) com cobertura parcial`
      );
    }
    if (filesWithTests === totalFiles) {
      console.log(
        "   • 🎉 Todos os arquivos têm testes! Considere melhorar a cobertura dos existentes"
      );
    }

    // Informações úteis para desenvolvimento
    console.log("\n🔧 Informações úteis para desenvolvimento:");
    console.log("   📁 Estrutura de testes: src/test/");
    console.log("   🧪 Componentes: src/test/components/");
    console.log("   🌐 API: src/test/api/");
    console.log("   ⚙️  Setup: src/test/setup.ts");
    console.log("\n⚡ Comandos úteis:");
    console.log("   • npm run test              # Executar todos os testes");
    console.log(
      "   • npm run test:watch        # Executar testes em modo watch"
    );
    console.log(
      "   • npm run test:coverage     # Executar testes com cobertura"
    );
    console.log("   • npm run coverage:analyze   # Ver resumo personalizado");
    console.log(
      "   • npm run test -- --reporter=verbose  # Testes com saída detalhada"
    );
    console.log("\n🎯 Para criar novos testes:");
    console.log(
      "   • Componentes: src/test/components/[NomeComponente].test.tsx"
    );
    console.log("   • Pages: src/test/pages/[NomePage].test.tsx");
    console.log("   • API: src/test/api/[nomeService].test.ts");
    console.log("   • Utils: src/test/utils/[nomeUtil].test.ts");

    console.log("==========================================\n");
  } catch (error) {
    console.error("❌ Erro ao analisar cobertura:", error.message);
    console.log("💡 Execute primeiro: npm run test:coverage");
  }
}

analyzeCoverage();
